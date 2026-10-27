import ReconnectingWebSocket from 'partysocket/ws'
import { createMergeableStore, type MergeableStore } from 'tinybase'
import { createLocalPersister } from 'tinybase/persisters/persister-browser'
import { createWsSynchronizer } from 'tinybase/synchronizers/synchronizer-ws-client'
import { spaceIdFor } from '@/lib/game-code'

/**
 * A table's shared space: a TinyBase store kept on this phone and synced through the Worker with everyone who has the
 * same words. Unsafe on purpose: anyone with the words can read and change it.
 */
export type SharedSpace = {
  store: MergeableStore
  isOnline: () => boolean
  onOnlineChange: (listener: () => void) => () => void
  close: () => Promise<void>
}

const openSpaces = new Map<string, Promise<SharedSpace>>()

/** The table behind a code, opened once and shared by every screen. */
export function sharedSpaceFor(code: string): Promise<SharedSpace> {
  const open = openSpaces.get(code) ?? openSharedSpace(code)
  openSpaces.set(code, open)
  open.catch(() => openSpaces.delete(code))
  return open
}

/** Stops syncing a table on this phone. Its copy stays in localStorage, so the words bring it straight back. */
export async function leaveSharedSpace(code: string): Promise<void> {
  const open = openSpaces.get(code)
  openSpaces.delete(code)
  if (open) await (await open).close()
}

/** Opens the table behind a code. Each table gets its own store on the phone, so tables never mix. */
async function openSharedSpace(code: string): Promise<SharedSpace> {
  const spaceId = await spaceIdFor(code)
  const store = createMergeableStore()
  const onThisPhone = createLocalPersister(store, `hartenjagen:table:${spaceId}`)
  await onThisPhone.startAutoPersisting()
  const socket = new ReconnectingWebSocket(spaceUrl(spaceId))
  // Not awaited: the copy on this phone is playable while the connection is still coming up, or never does.
  const syncing = createWsSynchronizer(store, socket).then(async (synchronizer) => synchronizer.startSync())
  const stopCatchingUp = catchUpNowAndThen(syncing)
  return {
    store,
    isOnline: () => socket.readyState === WebSocket.OPEN,
    onOnlineChange: (listener) => {
      socket.addEventListener('open', listener)
      socket.addEventListener('close', listener)
      return () => {
        socket.removeEventListener('open', listener)
        socket.removeEventListener('close', listener)
      }
    },
    close: async () => {
      stopCatchingUp()
      socket.close()
      // A connection that never came up never resolves, so don't wait on it.
      void syncing.then((synchronizer) => synchronizer.destroy())
      await onThisPhone.destroy()
    },
  }
}

/** How often a phone swaps the latest table with the others again, in case a change slipped past. */
const CATCH_UP_EVERY_MS = 5_000

/**
 * Pulls the others' latest content and pushes this phone's own, every few seconds and whenever the page comes back
 * into view. TinyBase fetches each change from the phone that made it with a 1-second timeout, so when that phone is
 * locked or throttled right after its move the change goes nowhere: not to the others, and not to the server either.
 */
function catchUpNowAndThen(
  syncing: Promise<{ load: () => Promise<unknown>; save: () => Promise<unknown> }>,
): () => void {
  const catchUp = () =>
    void syncing
      .then(async (synchronizer) => {
        await synchronizer.load()
        await synchronizer.save()
      })
      .catch(() => {})
  const catchUpWhenVisible = () => document.visibilityState === 'visible' && catchUp()
  const timer = setInterval(catchUp, CATCH_UP_EVERY_MS)
  document.addEventListener('visibilitychange', catchUpWhenVisible)
  return () => {
    clearInterval(timer)
    document.removeEventListener('visibilitychange', catchUpWhenVisible)
  }
}

/** Sets up a new table: the `startedAt` value is what tells joining phones the words are real. */
export async function startSharedTable(code: string): Promise<SharedSpace> {
  const space = await sharedSpaceFor(code)
  space.store.setValues({ startedAt: Date.now(), game: 0 })
  return space
}

/**
 * Whether anyone set up a table with these words. The server opens an empty space for any id, so without this
 * a typo would look like an empty table. Checks with a throwaway store, so nothing is kept on the phone.
 */
export async function isSharedTableStarted(code: string): Promise<boolean> {
  const store = createMergeableStore()
  const socket = new ReconnectingWebSocket(spaceUrl(await spaceIdFor(code)))
  const check = (async () => {
    const synchronizer = await createWsSynchronizer(store, socket)
    try {
      await synchronizer.startSync()
      return typeof store.getValue('startedAt') === 'number'
    } finally {
      await synchronizer.destroy()
    }
  })()
  return Promise.race([check, timeOut(CHECK_TIMEOUT_MS, socket)])
}

/** How long joining waits for the server before saying the phone seems offline. */
const CHECK_TIMEOUT_MS = 10_000

export class OfflineError extends Error {}

function timeOut(ms: number, socket: ReconnectingWebSocket): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => {
      socket.close()
      reject(new OfflineError())
    }, ms),
  )
}

function spaceUrl(spaceId: string): string {
  return `${location.origin.replace(/^http/, 'ws')}/api/sync/${spaceId}`
}
