import { readGameCode } from './game-code'
import { cleanName } from './players'

/** Who plays on this phone, and the game it was last in. Kept in localStorage, so read it carefully. */
export type ThisDevice = { playerId: string; name: string | null; code: string | null }

const STORAGE_KEY = 'hartenjagen:device'

export function loadThisDevice(storage: Storage, newId: () => string = () => crypto.randomUUID()): ThisDevice {
  const saved = readSaved(storage.getItem(STORAGE_KEY))
  const device: ThisDevice = {
    playerId: typeof saved.playerId === 'string' && saved.playerId !== '' ? saved.playerId : newId(),
    name: typeof saved.name === 'string' ? cleanName(saved.name) : null,
    code: typeof saved.code === 'string' && readGameCode(saved.code).status === 'ok' ? saved.code : null,
  }
  saveThisDevice(storage, device)
  return device
}

export function saveThisDevice(storage: Storage, device: ThisDevice): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(device))
}

function readSaved(text: string | null): Record<string, unknown> {
  if (text === null) return {}
  try {
    const saved: unknown = JSON.parse(text)
    return typeof saved === 'object' && saved !== null ? (saved as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}
