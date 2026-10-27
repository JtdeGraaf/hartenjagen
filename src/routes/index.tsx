import { createFileRoute, redirect } from '@tanstack/react-router'
import { HomeScreen } from '@/features/home/HomeScreen'
import { codeInLink } from '@/lib/game-code'
import { loadThisDevice } from '@/lib/this-device'

export const Route = createFileRoute('/')({
  // Back at a table you're already sitting at, unless a link asks you to join another one.
  beforeLoad: ({ location }) => {
    const device = loadThisDevice(localStorage)
    if (device.code && device.name && !codeInLink(location.hash)) throw redirect({ to: '/table' })
  },
  component: HomeScreen,
})
