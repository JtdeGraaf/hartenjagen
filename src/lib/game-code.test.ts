import { describe, expect, it } from 'vitest'
import { codeInLink, joinLink, newGameCode, readGameCode, spaceIdFor } from './game-code'
import { qrCodeFor } from './qr-code'
import { CODE_WORDS } from './words'

describe('the word list', () => {
  it('has only unique, plain lowercase words', () => {
    expect(new Set(CODE_WORDS).size).toBe(CODE_WORDS.length)
    expect(CODE_WORDS.filter((word) => !/^[a-z]{3,10}$/.test(word))).toEqual([])
  })

  it('is long enough for four words to give at least 39 bits', () => {
    expect(4 * Math.log2(CODE_WORDS.length)).toBeGreaterThanOrEqual(39)
  })
})

describe('newGameCode', () => {
  it('joins four picked words with dashes', () => {
    const picks = [0, 1, 2, 3]

    const code = newGameCode(() => picks.shift() ?? 0)

    expect(code).toBe(CODE_WORDS.slice(0, 4).join('-'))
  })
})

describe('readGameCode', () => {
  it('reads words typed with capitals, spaces and commas', () => {
    expect(readGameCode('  Otter, LAMP fig\tviolin ')).toEqual({ status: 'ok', code: 'otter-lamp-fig-violin' })
  })

  it('says how many words there were when the count is wrong', () => {
    expect(readGameCode('otter lamp fig')).toEqual({ status: 'wrong-word-count', wordCount: 3 })
  })

  it('names the words that are not on the list', () => {
    expect(readGameCode('otter lamb fig violn')).toEqual({ status: 'unknown-words', unknownWords: ['violn'] })
  })
})

describe('spaceIdFor', () => {
  it('gives the same 64-character id for the same code, and another for another code', async () => {
    const first = await spaceIdFor('otter-lamp-fig-violin')
    const again = await spaceIdFor('otter-lamp-fig-violin')
    const other = await spaceIdFor('otter-lamp-fig-viola')

    expect(first).toMatch(/^[0-9a-f]{64}$/)
    expect(again).toBe(first)
    expect(other).not.toBe(first)
  })
})

describe('join links', () => {
  it('puts the code after # and reads it back', () => {
    const link = joinLink('https://hartenjagen.graaf.dev', 'otter-lamp-fig-violin')

    expect(link).toBe('https://hartenjagen.graaf.dev/#join=otter-lamp-fig-violin')
    expect(codeInLink(new URL(link).hash)).toBe('otter-lamp-fig-violin')
  })

  it('finds no code in a hash without one', () => {
    expect(codeInLink('#about')).toBeNull()
  })
})

describe('qrCodeFor', () => {
  it('draws a square code with dark squares for a join link', () => {
    const qr = qrCodeFor(joinLink('https://hartenjagen.graaf.dev', 'otter-lamp-fig-violin'))

    expect(qr.size).toBeGreaterThanOrEqual(21)
    expect(qr.path).toMatch(/^M\d+ \d+h1v1h-1z/)
  })
})
