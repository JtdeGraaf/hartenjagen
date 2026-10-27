import { useTranslation } from 'react-i18next'
import { Saucer } from '@/components/Saucer'
import { Button } from '@/components/ui/button'
import { MAX_PLAYERS, MIN_PLAYERS } from '@/lib/players'
import type { TableView } from '@/lib/table-view'
import { CodeCard } from './CodeCard'

/** Before the first deal: the words to share, the saucers filling up, and the start once four or five sit down. */
export function WaitingTable({ view, code, onStart }: { view: TableView; code: string; onStart: () => void }) {
  const { t } = useTranslation()
  return (
    <div className="grid gap-6">
      <div className="notepad rounded-md p-5 pl-12">
        <CodeCard code={code} />
      </div>
      <section aria-label={t('table.seated')} className="grid gap-4">
        <ul className="flex flex-wrap justify-center gap-4">
          {view.seats.map((seat) => (
            <li key={seat.id}>
              <Saucer name={seat.name} isMe={seat.isMe} />
            </li>
          ))}
        </ul>
        <p className="mx-auto rounded-full bg-band/85 px-4 py-1 text-center text-sm font-semibold text-band-ink">
          {view.canStart
            ? t('table.readyToStart', { count: view.seats.length })
            : t('table.waitingForPlayers', { count: MIN_PLAYERS - view.seats.length })}
        </p>
        {view.watchers.length > 0 && (
          <p className="text-center text-sm font-semibold text-band-ink">
            {t('table.tableFull', { max: MAX_PLAYERS })}
          </p>
        )}
        <Button disabled={!view.canStart} onClick={onStart}>
          {t('table.start')}
        </Button>
      </section>
    </div>
  )
}
