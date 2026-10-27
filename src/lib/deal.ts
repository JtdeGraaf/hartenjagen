import { FULL_DECK } from './cards'

export type PlayerCount = 4 | 5

export const PLAYER_COUNTS: readonly PlayerCount[] = [4, 5]

export function isPlayerCount(value: number): value is PlayerCount {
  return PLAYER_COUNTS.includes(value as PlayerCount)
}

/** Four players get 8 cards each. Five get 6, and the 2 left over lie face down as the stok. */
export type Deal = { hands: string[][]; stock: string[] }

export function cardsPerPlayer(players: PlayerCount): number {
  return players === 4 ? 8 : 6
}

/** Shuffles the 32 cards and deals them out. `randomBelow` is injectable so tests can fix the order. */
export function dealCards(players: PlayerCount, randomBelow: (size: number) => number = secureRandomBelow): Deal {
  const deck = [...FULL_DECK]
  for (let index = deck.length - 1; index > 0; index--) {
    const other = randomBelow(index + 1)
    ;[deck[index], deck[other]] = [deck[other], deck[index]]
  }
  const perPlayer = cardsPerPlayer(players)
  const hands = Array.from({ length: players }, (_, seat) => deck.slice(seat * perPlayer, (seat + 1) * perPlayer))
  return { hands, stock: deck.slice(players * perPlayer) }
}

/** Who deals each hand, counting hands from 1: the deal moves one seat on each time. */
export function dealerOf(handNumber: number, players: PlayerCount): number {
  return (handNumber - 1) % players
}

/** The player after the dealer leads the first trick. */
export function firstLeaderOf(handNumber: number, players: PlayerCount): number {
  return (dealerOf(handNumber, players) + 1) % players
}

/** A whole number below `size` from the browser's secure random source, without the bias of a plain modulo. */
function secureRandomBelow(size: number): number {
  const limit = Math.floor(2 ** 32 / size) * size
  const buffer = new Uint32Array(1)
  do crypto.getRandomValues(buffer)
  while (buffer[0] >= limit)
  return buffer[0] % size
}
