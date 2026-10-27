import type { HandState, Trick } from './hand'
import type { Seat } from './table-view'

/** The other players in the order they play after you, so the table reads clockwise from your left. */
export function seatsAfter(seats: readonly Seat[], mySeat: number | null): Seat[] {
  if (mySeat === null) return [...seats]
  return [...seats.slice(mySeat + 1), ...seats.slice(0, mySeat)]
}

export type TrickOnTable = { trick: Trick; takenBy: number | null }

/** The trick in the middle; between tricks, the last one stays visible with who took it, until the next card lands. */
export function trickOnTable(hand: HandState): TrickOnTable {
  if (hand.currentTrick.cards.length > 0 || hand.finishedTricks.length === 0)
    return { trick: hand.currentTrick, takenBy: null }
  const last = hand.finishedTricks[hand.finishedTricks.length - 1]
  return { trick: last, takenBy: last.winner }
}
