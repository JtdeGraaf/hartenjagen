import { useTranslation } from 'react-i18next'
import { Saucer } from '@/components/Saucer'
import { Button } from '@/components/ui/button'
import { seatsAfter } from '@/lib/table-layout'
import type { TableView } from '@/lib/table-view'
import { MyHand } from './MyHand'
import { TrickArea } from './TrickArea'

type PlayAreaProps = { view: TableView; onDeal: () => void; onPlay: (card: string) => void; onOpenScore: () => void }

/** The table from your seat: the others' saucers across the top, the trick in the middle, your hand at the bottom. */
export function PlayArea({ view, onDeal, onPlay, onOpenScore }: PlayAreaProps) {
  const { t } = useTranslation()
  const others = seatsAfter(view.seats, view.mySeat)
  return (
    <div className="grid min-h-[calc(100dvh-4rem)] grid-rows-[auto_1fr_auto] gap-2">
      <ul aria-label={t('table.others')} className="flex justify-center gap-3 pt-2">
        {others.map((seat) => (
          <li key={seat.id}>
            <Saucer
              name={seat.name}
              isTurn={view.turn?.id === seat.id}
              detail={view.hand ? t('table.points', { count: view.hand.points[seat.seat] }) : undefined}
            />
          </li>
        ))}
      </ul>

      {view.phase === 'playing' && view.hand && view.deal ? (
        <TrickArea
          hand={view.hand}
          others={others}
          me={view.seats.find((seat) => seat.isMe) ?? null}
          stock={view.deal.stock}
        />
      ) : (
        <BetweenHands view={view} onDeal={onDeal} onOpenScore={onOpenScore} />
      )}

      <div className="grid gap-1 pb-3">
        <TurnLine view={view} />
        <MyHand cards={view.myCards} playable={view.playable} onPlay={onPlay} />
      </div>
    </div>
  )
}

function TurnLine({ view }: { view: TableView }) {
  const { t } = useTranslation()
  if (view.phase !== 'playing') return null
  if (view.mySeat === null) return <p className="text-center font-semibold text-band-ink">{t('table.watching')}</p>
  const myPoints = view.hand?.points[view.mySeat] ?? 0
  return (
    <p aria-live="polite" className="flex items-center justify-center gap-3">
      <span
        className={
          view.isMyTurn
            ? 'text-lettered rounded-full bg-turn px-4 py-1 text-2xl text-band shadow-card'
            : 'rounded-full bg-band/85 px-4 py-1 font-bold text-band-ink'
        }
      >
        {view.isMyTurn ? t('table.yourTurn') : t('table.theirTurn', { name: view.turn?.name })}
      </span>
      <span className="rounded-full bg-saucer px-3 py-1 text-sm font-bold text-band">
        {t('table.yourPoints', { count: myPoints })}
      </span>
    </p>
  )
}

/** Between hands: who deals next, with a look at the notepad. */
function BetweenHands({ view, onDeal, onOpenScore }: { view: TableView; onDeal: () => void; onOpenScore: () => void }) {
  const { t } = useTranslation()
  const lastHand = view.score.hands.at(-1)
  return (
    <section className="grid content-center justify-items-center gap-4 px-4">
      {lastHand && (
        <p className="rounded-full bg-band px-4 py-1 text-center font-bold text-band-ink">
          {lastHand.allPointsBy === null
            ? t('table.handDone', { number: view.score.hands.length })
            : t('table.allPointsTaken', { name: view.seats[lastHand.allPointsBy]?.name })}
        </p>
      )}
      {view.isMyDeal ? (
        <Button width="fit" onClick={onDeal}>
          {t('table.deal', { number: view.handNumber })}
        </Button>
      ) : (
        <p className="text-center font-semibold text-band-ink">
          {t('table.waitingForDeal', { name: view.dealer?.name })}
        </p>
      )}
      {view.score.hands.length > 0 && (
        <Button look="onCloth" width="fit" onClick={onOpenScore}>
          {t('table.openScore')}
        </Button>
      )}
    </section>
  )
}
