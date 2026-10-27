import { isPlayerCount, type PlayerCount } from './deal'

export type Player = { id: string; name: string; joinedAt: number }

export const MIN_PLAYERS = 4
export const MAX_PLAYERS = 5
export const MAX_NAME_LENGTH = 14

/** The first five to sit down, in the order they joined; seat 0 is the first. */
export function seatsFor(players: readonly Player[]): string[] {
  return [...players]
    .sort((first, second) => first.joinedAt - second.joinedAt || first.id.localeCompare(second.id))
    .slice(0, MAX_PLAYERS)
    .map((player) => player.id)
}

/** How many play this game, or null while there aren't four yet. */
export function playerCountOf(seats: readonly string[]): PlayerCount | null {
  return isPlayerCount(seats.length) ? seats.length : null
}

/** A name as typed, trimmed and cut to fit at the table, or null when nothing is left. */
export function cleanName(typed: string): string | null {
  const name = typed.trim().replace(/\s+/g, ' ').slice(0, MAX_NAME_LENGTH)
  return name === '' ? null : name
}
