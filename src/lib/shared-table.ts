import { FULL_DECK } from './cards'
import { isPlayerCount, type Deal } from './deal'
import type { Play } from './hand'
import type { Player } from './players'

/**
 * What a table looks like in the shared space. Anyone with the words can write to it, and an older version of the
 * app may have, so every value is checked and anything that doesn't fit is left out.
 *
 * Values: `startedAt` (ms), `game` (0 while the table waits for players), `seats` (JSON list of player ids in seat
 * order, fixed for a game). Tables: `players` keyed by player id; `deals` keyed by `<game>-<hand>`; `plays` keyed by
 * `<game>-<hand>-<number>`.
 */
export type SharedTable = {
  game: number
  seats: string[]
  players: Player[]
  /** This game's deals, by hand number from 1. */
  deals: Map<number, Deal>
  /** This game's plays, by hand number, with the seat looked up from who played. */
  plays: Map<number, Play[]>
}

type Rows = Record<string, Record<string, unknown>>

/** The table, or null when nobody has set one up with these words. */
export function readSharedTable(
  values: Record<string, unknown>,
  players: Rows,
  deals: Rows,
  plays: Rows,
): SharedTable | null {
  if (typeof values.startedAt !== 'number') return null
  const game = isWholeNumber(values.game) ? values.game : 0
  const seats = game === 0 ? [] : readSeats(values.seats)
  const playerList = Object.entries(players).flatMap(([id, row]) => readPlayer(id, row))
  return {
    game,
    seats,
    players: playerList,
    deals: new Map(Object.values(deals).flatMap((row) => readDeal(row, game, seats.length))),
    plays: groupByHand(Object.values(plays).flatMap((row) => readPlay(row, game, seats))),
  }
}

export function dealRowId(game: number, hand: number): string {
  return `${game}-${hand}`
}

export function playRowId(game: number, hand: number, number: number): string {
  return `${game}-${hand}-${number}`
}

export function dealCell(deal: Deal): string {
  return JSON.stringify(deal)
}

function readPlayer(id: string, row: Record<string, unknown>): Player[] {
  if (typeof row.name !== 'string' || row.name === '' || typeof row.joinedAt !== 'number') return []
  return [{ id, name: row.name, joinedAt: row.joinedAt }]
}

function readDeal(row: Record<string, unknown>, game: number, players: number): [number, Deal][] {
  if (row.game !== game || !isWholeNumber(row.hand) || typeof row.cards !== 'string') return []
  const deal = parseJson(row.cards)
  if (!isDeal(deal, players)) return []
  return [[row.hand, deal]]
}

/** A deal is only trusted when it is exactly the 32 cards, split evenly over the seats. */
function isDeal(value: unknown, players: number): value is Deal {
  if (typeof value !== 'object' || value === null || !isPlayerCount(players)) return false
  const { hands, stock } = value as Record<string, unknown>
  if (!Array.isArray(hands) || hands.length !== players || !Array.isArray(stock)) return false
  const cards = [...hands.flat(), ...stock]
  return cards.length === 32 && new Set(cards).size === 32 && cards.every((card) => FULL_DECK.includes(card as string))
}

function readPlay(row: Record<string, unknown>, game: number, seats: string[]): [number, Play][] {
  if (row.game !== game || !isWholeNumber(row.hand) || !isWholeNumber(row.number)) return []
  if (typeof row.card !== 'string' || typeof row.playerId !== 'string') return []
  const seat = seats.indexOf(row.playerId)
  if (seat === -1) return []
  return [[row.hand, { number: row.number, card: row.card, seat }]]
}

function groupByHand(plays: [number, Play][]): Map<number, Play[]> {
  const byHand = new Map<number, Play[]>()
  for (const [hand, play] of plays) byHand.set(hand, [...(byHand.get(hand) ?? []), play])
  return byHand
}

function readSeats(text: unknown): string[] {
  const seats = typeof text === 'string' ? parseJson(text) : null
  return Array.isArray(seats) ? seats.filter((seat): seat is string => typeof seat === 'string') : []
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function isWholeNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0
}
