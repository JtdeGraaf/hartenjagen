import { describe, expect, it } from 'vitest'
import { JOIN_PROBLEM_CODES } from '@/lib/join-problems'
import en from './locales/en/translation.json'
import nl from './locales/nl/translation.json'

/** Every text in a translation file as [dotted key, text] pairs. */
function flatten(tree: object, prefix = ''): [string, string][] {
  return Object.entries(tree).flatMap(([key, value]): [string, string][] => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof value === 'object' && value !== null ? flatten(value, path) : [[path, String(value)]]
  })
}

describe('translations', () => {
  it('have the same keys in English and Dutch', () => {
    const englishKeys = flatten(en)
      .map(([key]) => key)
      .sort()
    const dutchKeys = flatten(nl)
      .map(([key]) => key)
      .sort()

    expect(dutchKeys).toEqual(englishKeys)
  })

  it('leave no text empty in either language', () => {
    const empty = [...flatten(en), ...flatten(nl)].filter(([, text]) => text.trim() === '').map(([key]) => key)

    expect(empty).toEqual([])
  })

  it('have error texts for exactly the join problem codes', () => {
    const codes = new Set(Object.keys(en.errors).map((key) => key.replace(/_(one|other)$/, '')))

    expect([...codes].sort()).toEqual([...JOIN_PROBLEM_CODES].sort())
  })
})
