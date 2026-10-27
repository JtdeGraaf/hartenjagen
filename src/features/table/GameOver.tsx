import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import type { TableView } from '@/lib/table-view'
import { ScorePad } from './ScorePad'

/** The game is won: who reached 0 first, the full notepad, and a fresh game at the same table. */
export function GameOver({ view, onNewGame }: { view: TableView; onNewGame: () => void }) {
  const { t } = useTranslation()
  const names = view.winners.map((seat) => (seat.isMe ? t('table.you') : seat.name)).join(' & ')
  const [onlyWinner] = view.winners
  function headline() {
    if (view.winners.length > 1) return t('table.sharedWin', { names })
    if (onlyWinner?.isMe) return t('table.youWin')
    return t('table.winner', { name: names })
  }

  return (
    <div className="grid gap-5 pt-2 pb-8">
      <h2 className="text-lettered text-center text-5xl text-band-ink drop-shadow-[0_3px_6px_rgb(59_36_24/0.65)]">
        {headline()}
      </h2>
      <div className="notepad rounded-md p-5 pl-12">
        <ScorePad view={view} />
      </div>
      <Button onClick={onNewGame}>{t('table.newGame')}</Button>
    </div>
  )
}
