import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18next from 'i18next'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MyHand } from './MyHand'

describe('your hand', () => {
  beforeEach(async () => {
    await i18next.changeLanguage('en')
  })

  it('plays a card you may play, and refuses one you may not', async () => {
    const onPlay = vi.fn()
    render(<MyHand cards={['8C', 'AH']} playable={['8C']} onPlay={onPlay} />)

    await userEvent.click(screen.getByRole('button', { name: 'Play the eight of clubs' }))
    await userEvent.click(screen.getByRole('button', { name: 'ace of hearts' }))

    expect(onPlay).toHaveBeenCalledTimes(1)
    expect(onPlay).toHaveBeenCalledWith('8C')
  })
})
