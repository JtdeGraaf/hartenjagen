import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { useTable as useTinyTable, useValues } from 'tinybase/ui-react'
import { dealCards } from '@/lib/deal'
import { playerCountOf, seatsFor } from '@/lib/players'
import { dealCell, dealRowId, playRowId, readSharedTable } from '@/lib/shared-table'
import { viewTable, type TableView } from '@/lib/table-view'
import { sharedSpaceFor, type SharedSpace } from './shared-space'

const NO_SPACE = { subscribe: () => () => {}, isOnline: () => false }

/** The table behind a code as this phone sees it, and what this phone can do at it. */
export function useTable(code: string, me: { id: string; name: string }) {
  const space = useSharedSpace(code)
  const store = space?.store
  const values = useValues(store)
  const players = useTinyTable('players', store)
  const deals = useTinyTable('deals', store)
  const plays = useTinyTable('plays', store)
  const isOnline = useSyncExternalStore(
    space?.onOnlineChange ?? NO_SPACE.subscribe,
    space?.isOnline ?? NO_SPACE.isOnline,
  )

  const view: TableView | null = useMemo(() => {
    const table = readSharedTable(values, players, deals, plays)
    return table === null ? null : viewTable(table, me.id)
  }, [values, players, deals, plays, me.id])

  // Taking a seat is automatic: being at the table on this phone means sitting down.
  const hasSatDown = view === null || view.players.some((player) => player.id === me.id)
  useEffect(() => {
    if (!store || hasSatDown) return
    store.setRow('players', me.id, { name: me.name, joinedAt: Date.now() })
  }, [store, hasSatDown, me.id, me.name])

  const startGame = useCallback(() => {
    if (!store || !view) return
    store.setPartialValues({ game: view.game + 1, seats: JSON.stringify(seatsFor(view.players)) })
  }, [store, view])

  const deal = useCallback(() => {
    const players = view && playerCountOf(view.seats.map((seat) => seat.id))
    if (!store || !view?.isMyDeal || !players) return
    const cards = dealCards(players)
    store.setRow('deals', dealRowId(view.game, view.handNumber), {
      game: view.game,
      hand: view.handNumber,
      cards: dealCell(cards),
    })
  }, [store, view])

  const playCard = useCallback(
    (card: string) => {
      if (!store || !view?.hand || !view.playable.includes(card)) return
      const number = view.hand.nextPlayNumber
      store.setRow('plays', playRowId(view.game, view.handNumber, number), {
        game: view.game,
        hand: view.handNumber,
        number,
        card,
        playerId: me.id,
      })
    },
    [store, view, me.id],
  )

  return { isOpening: space === null, isOnline, view, startGame, deal, playCard }
}

function useSharedSpace(code: string): SharedSpace | null {
  const [opened, setOpened] = useState<{ code: string; space: SharedSpace } | null>(null)
  useEffect(() => {
    let isCurrent = true
    void sharedSpaceFor(code).then((space) => isCurrent && setOpened({ code, space }))
    return () => {
      isCurrent = false
    }
  }, [code])
  return opened?.code === code ? opened.space : null
}
