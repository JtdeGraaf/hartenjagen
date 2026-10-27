import '@fontsource/shrikhand/400.css'
import '@fontsource-variable/albert-sans/index.css'
import '@fontsource/gochi-hand/400.css'
import './styles.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setUpTranslations, startingLanguage } from './i18n/i18n'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

await setUpTranslations(startingLanguage())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
