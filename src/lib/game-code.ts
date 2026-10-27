import { CODE_WORDS } from './words'

/**
 * A game's code: four words like "otter-lamp-fig-violin". Anyone who has them can join, watch and change the game,
 * so they are a seat at the table, not a password.
 */
export const WORDS_PER_CODE = 4

/** Picks four words, each with the same chance. `randomBelow` is injectable so tests can pick the words. */
export function newGameCode(randomBelow: (size: number) => number = secureRandomBelow): string {
  return Array.from({ length: WORDS_PER_CODE }, () => CODE_WORDS[randomBelow(CODE_WORDS.length)]).join('-')
}

export type TypedCode =
  | { status: 'ok'; code: string }
  | { status: 'wrong-word-count'; wordCount: number }
  | { status: 'unknown-words'; unknownWords: string[] }

/** Reads a code as someone typed it: capitals, spaces, dashes and commas are all fine. */
export function readGameCode(text: string): TypedCode {
  const typed = text
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((word) => word !== '')
  if (typed.length !== WORDS_PER_CODE) return { status: 'wrong-word-count', wordCount: typed.length }
  const known = new Set(CODE_WORDS)
  const unknownWords = typed.filter((word) => !known.has(word))
  if (unknownWords.length > 0) return { status: 'unknown-words', unknownWords }
  return { status: 'ok', code: typed.join('-') }
}

/** The server's name for a game: SHA-256 hex of the app name and the code, so the words never leave the phone. */
export async function spaceIdFor(code: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`hartenjagen:${code}`))
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

/** The link a friend opens by scanning the QR code. The words sit after # so no server sees them. */
export function joinLink(origin: string, code: string): string {
  return `${origin}/#join=${code}`
}

/** The words in a link's `#join=…`, or null when there are none. */
export function codeInLink(hash: string): string | null {
  const match = /(?:^|[#&])join=([a-z-]+)/.exec(hash)
  return match ? match[1] : null
}

/** A whole number below `size` from the browser's secure random source, without the bias of a plain modulo. */
function secureRandomBelow(size: number): number {
  const limit = Math.floor(2 ** 32 / size) * size
  const buffer = new Uint32Array(1)
  do crypto.getRandomValues(buffer)
  while (buffer[0] >= limit)
  return buffer[0] % size
}
