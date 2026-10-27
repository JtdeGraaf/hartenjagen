import { createFileRoute, redirect } from '@tanstack/react-router'
import { TableScreen } from '@/features/table/TableScreen'
import { loadThisDevice } from '@/lib/this-device'

export const Route = createFileRoute('/table')({
  beforeLoad: () => {
    const device = loadThisDevice(localStorage)
    if (!device.code || !device.name) throw redirect({ to: '/' })
    return { code: device.code, name: device.name }
  },
  component: TablePage,
})

function TablePage() {
  const { code, name } = Route.useRouteContext()
  return <TableScreen key={code} code={code} name={name} />
}
