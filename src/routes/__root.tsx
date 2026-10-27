import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Oilcloth } from '@/components/Oilcloth'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <>
      <Oilcloth />
      <Outlet />
    </>
  )
}

function NotFound() {
  const { t } = useTranslation()
  return (
    <main className="grid min-h-dvh place-content-center gap-4 text-center">
      <p className="text-lettered text-4xl text-band-ink">{t('notFound.title')}</p>
      <Link to="/" className="font-bold text-band-ink underline">
        {t('notFound.home')}
      </Link>
    </main>
  )
}
