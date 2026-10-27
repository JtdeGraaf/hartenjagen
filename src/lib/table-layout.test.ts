import { describe, expect, it } from 'vitest'
import { playHand } from './hand'
import { seatsAfter, trickOnTable } from './table-layout'

const seats = ['ann', 'bas', 'cor', 'dirk'].map((name, seat) => ({ seat, id: name, name, isMe: false }))

describe('seatsAfter', () => {
  it('lists the others in playing order, starting with the player after you', () => {
    expect(seatsAfter(seats, 2).map((seat) => seat.name)).toEqual(['dirk', 'ann', 'bas'])
  })

  it('shows everyone to someone who is only watching', () => {
    expect(seatsAfter(seats, null)).toHaveLength(4)
  })
})

describe('trickOnTable', () => {
  const deal = {
    hands: [
      ['7C', 'AH'],
      ['8C', 'QS'],
      ['9C', '7H'],
      ['JC', 'KH'],
    ],
    stock: [],
  }
  const firstTrick = ['7C', '8C', '9C', 'JC'].map((card, seat) => ({ number: seat, card, seat }))

  it('keeps the finished trick in view with who took it until the next card is played', () => {
    const shown = trickOnTable(playHand(deal, 0, firstTrick))

    expect(shown.trick.cards).toHaveLength(4)
    expect(shown.takenBy).toBe(3)
  })

  it('shows the new trick as soon as its first card is down', () => {
    const shown = trickOnTable(playHand(deal, 0, [...firstTrick, { number: 4, card: 'KH', seat: 3 }]))

    expect(shown.trick.cards).toEqual([{ seat: 3, card: 'KH' }])
    expect(shown.takenBy).toBeNull()
  })
})
