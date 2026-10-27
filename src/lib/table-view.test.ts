import { describe, expect, it } from 'vitest'
import { dealCards, firstLeaderOf } from './deal'
import { playableCards, playHand, type Play } from './hand'
import { readSharedTable, type SharedTable } from './shared-table'
import { viewTable } from './table-view'

const players = ['ann', 'bas', 'cor', 'dirk', 'eva'].map((id, index) => ({
  id,
  name: id.toUpperCase(),
  joinedAt: index,
}))
const noShuffle = (size: number) => size - 1

function table(overrides: Partial<SharedTable>): SharedTable {
  return { game: 0, seats: [], players: players.slice(0, 4), deals: new Map(), plays: new Map(), ...overrides }
}

/** Plays a whole hand by always laying the first card the rules allow. */
function playOut(seatCount: 4 | 5, hand: number): Play[] {
  const deal = dealCards(seatCount, noShuffle)
  const plays: Play[] = []
  for (;;) {
    const state = playHand(deal, firstLeaderOf(hand, seatCount), plays)
    if (state.turn === null) return plays
    const card = playableCards(state.holding[state.turn], state.currentTrick)[0]
    plays.push({ number: plays.length, card, seat: state.turn })
  }
}

describe('viewTable', () => {
  it('waits until four have joined, seating them in join order', () => {
    expect(viewTable(table({ players: players.slice(0, 3) }), 'ann').canStart).toBe(false)

    const view = viewTable(table({}), 'cor')

    expect(view.phase).toBe('waiting')
    expect(view.seats.map((seat) => [seat.name, seat.isMe])).toEqual([
      ['ANN', false],
      ['BAS', false],
      ['COR', true],
      ['DIRK', false],
    ])
    expect(view.canStart).toBe(true)
  })

  it('asks the first dealer to deal once the game starts', () => {
    const view = viewTable(table({ game: 1, seats: ['ann', 'bas', 'cor', 'dirk'] }), 'ann')

    expect(view.phase).toBe('dealing')
    expect(view.isMyDeal).toBe(true)
    expect(view.handNumber).toBe(1)
  })

  it('shows this phone its own sorted cards and, on its turn, only the playable ones', () => {
    const deal = dealCards(4, noShuffle)
    const view = viewTable(table({ game: 1, seats: ['ann', 'bas', 'cor', 'dirk'], deals: new Map([[1, deal]]) }), 'bas')

    expect(view.phase).toBe('playing')
    expect(view.myCards).toHaveLength(8)
    expect(view.turn?.name).toBe('BAS')
    expect(view.isMyTurn).toBe(true)
    expect(view.playable).toEqual(view.myCards)
  })

  it('moves to the next deal after a hand, with the score on the pad', () => {
    const deal = dealCards(5, noShuffle)
    const shared = table({
      game: 1,
      players,
      seats: players.map((player) => player.id),
      deals: new Map([[1, deal]]),
      plays: new Map([[1, playOut(5, 1)]]),
    })

    const view = viewTable(shared, 'eva')

    expect(view.phase).toBe('dealing')
    expect(view.handNumber).toBe(2)
    expect(view.dealer?.name).toBe('BAS')
    expect(view.score.hands).toHaveLength(1)
    expect(view.score.totals.reduce((sum, points) => sum + points, 0)).toBe(15)
  })

  it('lets someone who joined mid-game watch', () => {
    const view = viewTable(table({ game: 1, seats: ['ann', 'bas', 'cor', 'dirk'], players }), 'eva')

    expect(view.watchers.map((player) => player.id)).toEqual(['eva'])
    expect(view.mySeat).toBeNull()
  })
})

describe('readSharedTable', () => {
  const values = { startedAt: 1, game: 1, seats: '["ann","bas","cor","dirk"]' }
  const playerRows = Object.fromEntries(players.slice(0, 4).map(({ id, name, joinedAt }) => [id, { name, joinedAt }]))

  it('finds no table in a space nobody set up', () => {
    expect(readSharedTable({}, {}, {}, {})).toBeNull()
  })

  it('reads deals and plays of the current game, and looks up seats from who played', () => {
    const deal = dealCards(4, noShuffle)
    const shared = readSharedTable(
      values,
      playerRows,
      {
        '1-1': { game: 1, hand: 1, cards: JSON.stringify(deal) },
        '0-1': { game: 0, hand: 1, cards: JSON.stringify(deal) },
      },
      { '1-1-0': { game: 1, hand: 1, number: 0, card: '7C', playerId: 'bas' } },
    )

    expect(shared?.deals.get(1)).toEqual(deal)
    expect(shared?.deals.size).toBe(1)
    expect(shared?.plays.get(1)).toEqual([{ number: 0, card: '7C', seat: 1 }])
  })

  it('refuses a deal that is not exactly the 32 cards split over the seats', () => {
    const broken = { hands: [['7C', '7C'], [], [], []], stock: [] }

    const shared = readSharedTable(
      values,
      playerRows,
      { '1-1': { game: 1, hand: 1, cards: JSON.stringify(broken) } },
      {},
    )

    expect(shared?.deals.size).toBe(0)
  })

  it('drops plays by someone without a seat, and rows missing a field', () => {
    const shared = readSharedTable(
      values,
      playerRows,
      {},
      {
        '1-1-0': { game: 1, hand: 1, number: 0, card: '7C', playerId: 'stranger' },
        '1-1-1': { game: 1, hand: 1, number: 1, playerId: 'ann' },
      },
    )

    expect(shared?.plays.size).toBe(0)
  })
})
