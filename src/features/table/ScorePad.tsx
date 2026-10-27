import { useTranslation } from 'react-i18next'
import { COUNT_UP_TO } from '@/lib/scoring'
import type { TableView } from '@/lib/table-view'
import { cn } from '@/lib/utils'

/** The notepad: one row per hand with what it did to each score, and the running totals underneath. */
export function ScorePad({ view }: { view: TableView }) {
  const { t } = useTranslation()
  const { score, seats } = view

  function directionText() {
    if (score.winners.length > 0) return t('score.final')
    if (score.nextDirection === 'up') return t('score.countingUp', { target: COUNT_UP_TO })
    return t('score.countingDown')
  }
  return (
    <div className="grid gap-3">
      <p className="pencilled text-xl">{directionText()}</p>
      <table className="w-full table-fixed border-collapse text-center">
        <thead>
          <tr>
            <th className="w-9 pb-1 text-left text-xs font-bold text-pencil-soft">{t('score.hand')}</th>
            {seats.map((seat) => (
              <th
                key={seat.id}
                className={cn('truncate pb-1 text-sm font-extrabold text-band', seat.isMe && 'underline')}
              >
                {seat.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {score.hands.map((hand, index) => (
            <tr key={index} className="h-14 align-top">
              <td className="pencilled text-left">{index + 1}</td>
              {hand.change.map((change, seat) => (
                <td key={seat} className="pencilled text-lg leading-tight">
                  {formatChange(change)}
                  <span className="block text-sm text-pencil-soft">{hand.totals[seat]}</span>
                  {hand.allPointsBy === seat && (
                    <span className="block text-xs text-card-red">{t('score.allPoints')}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
          {score.hands.length === 0 && (
            <tr className="h-7">
              <td colSpan={seats.length + 1} className="pencilled text-left">
                {t('score.empty')}
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-pencil">
            <td className="pt-1 text-left text-xs font-bold text-pencil-soft">{t('score.total')}</td>
            {score.totals.map((total, seat) => (
              <td key={seat} className="pencilled pt-1 text-2xl">
                {total}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
      <p className="text-sm text-pencil-soft">{t('score.rules')}</p>
    </div>
  )
}

/** Signed, so a count-down hand reads as taking off: +3, −3, 0. */
function formatChange(change: number): string {
  if (change > 0) return `+${change}`
  if (change < 0) return `−${Math.abs(change)}`
  return '0'
}
