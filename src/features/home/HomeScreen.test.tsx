import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18next from 'i18next'
import { beforeEach, describe, expect, it } from 'vitest'
import { routeTree } from '@/routeTree.gen'

function renderHome(url = '/') {
  const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: [url] }) })
  render(<RouterProvider router={router} />)
}

describe('the home form', () => {
  beforeEach(async () => {
    localStorage.clear()
    await i18next.changeLanguage('en')
  })

  it('asks for a name before setting up a table', async () => {
    renderHome()

    await userEvent.click(await screen.findByRole('button', { name: 'Set up a new table' }))

    expect(await screen.findByText(i18next.t('home.nameRequired'))).toBeInTheDocument()
  })

  it('names a misspelled code word instead of looking for the table', async () => {
    renderHome()

    await userEvent.type(await screen.findByLabelText('Your name'), 'Anna')
    await userEvent.type(screen.getByLabelText('The four words'), 'water book echo windoww')
    await userEvent.click(screen.getByRole('button', { name: 'Pull up a chair' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('windoww')
  })

  it('fills in the words from a scanned join link', async () => {
    renderHome('/#join=water-book-echo-window')

    expect(await screen.findByLabelText('The four words')).toHaveValue('water book echo window')
  })

  it('speaks Dutch when switched', async () => {
    renderHome()

    await userEvent.click(await screen.findByRole('button', { name: 'nl' }))

    expect(await screen.findByRole('button', { name: 'Schuif aan' })).toBeInTheDocument()
  })
})
