import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CardBack, PlayingCard } from '@/components/PlayingCard'
import { gatherTowards, type GatherTowards } from '@/lib/fan'
import type { HandState, Trick } from '@/lib/hand'
import { trickOnTable } from '@/lib/table-layout'
import type { Seat } from '@/lib/table-view'
import { cn } from '@/lib/utils'

/** The finished trick slides off towards whoever took it. */
const GATHER: Record<GatherTowards, string> = {
  me: 'animate-gather-me',
  'far-left': 'animate-gather-far-left',
  left: 'animate-gather-left',
  right: 'animate-gather-right',
  'far-right': 'animate-gather-far-right',
}

type TrickAreaProps = { hand: HandState; others: Seat[]; me: Seat | null; stock: string[] }

/**
 * The middle of the table. Each player's card lies in front of their place: the others' in a row under their saucers,
 * yours closest to you. A finished trick slides to its winner; the last one can be looked back at.
 */
export function TrickArea({ hand, others, me, stock }: TrickAreaProps) {
  const { t } = useTranslation()
  const [isShowingLast, setIsShowingLast] = useState(false)
  const { trick, takenBy } = trickOnTable(hand)
  const lastTrick = hand.finishedTricks.at(-1)
  const canLookBack = takenBy === null && lastTrick !== undefined
  const shown = isShowingLast && canLookBack ? lastTrick : trick
  const winnerIndex = others.findIndex((seat) => seat.seat === takenBy)
  const gather = takenBy === null ? null : GATHER[gatherTowards(winnerIndex === -1 ? null : winnerIndex, others.length)]
  const isStockOnTable = stock.length > 0 && hand.stockTakenBy === null

  return (
    <section
      aria-label={t('table.middle')}
      aria-live="polite"
      className="grid content-center justify-items-center gap-2"
    >
      <TrickCards trick={shown} others={others} me={me} gather={gather} />
      <div className="flex min-h-8 flex-wrap items-center justify-center gap-2">
        {takenBy !== null && (
          <p className="rounded-full bg-band px-3 py-1 text-sm font-bold text-band-ink">
            {t('table.tookTrick', { name: seatName(takenBy, others, me) })}
          </p>
        )}
        {canLookBack && (
          <button
            type="button"
            onClick={() => setIsShowingLast((showing) => !showing)}
            aria-pressed={isShowingLast}
            className="rounded-full bg-band/85 px-3 py-1 text-sm font-bold text-band-ink aria-pressed:bg-band-ink aria-pressed:text-band"
          >
            {isShowingLast ? t('table.backToTrick') : t('table.lastTrick')}
          </button>
        )}
        {isStockOnTable && (
          <span className="flex items-center gap-2">
            <span className="flex pl-2">
              {stock.map((card) => (
                <CardBack key={card} className="-ml-2 w-9" />
              ))}
            </span>
            <span className="rounded-full bg-band/85 px-2 py-0.5 text-xs font-bold text-band-ink">
              {t('table.stock')}
            </span>
          </span>
        )}
      </div>
    </section>
  )
}

type TrickCardsProps = { trick: Trick; others: Seat[]; me: Seat | null; gather: string | null }

function TrickCards({ trick, others, me, gather }: TrickCardsProps) {
  const cardOf = (seat: number) => trick.cards.find((played) => played.seat === seat)?.card
  return (
    <div className={cn('grid justify-items-center gap-1', gather)}>
      <ol className="flex justify-center gap-1.5">
        {others.map((seat) => (
          <li key={seat.id}>
            <Slot card={cardOf(seat.seat)} from="top" />
          </li>
        ))}
      </ol>
      {me && <Slot card={cardOf(me.seat)} from="bottom" />}
    </div>
  )
}

/** One place on the table: the card played there, or the faint outline of where it will land. */
function Slot({ card, from }: { card: string | undefined; from: 'top' | 'bottom' }) {
  if (!card) {
    return (
      <span
        aria-hidden="true"
        className="block aspect-[5/7] w-[4.1rem] rounded-[var(--radius-card)] border-2 border-dashed border-band/25 md:w-24"
      />
    )
  }
  return (
    <PlayingCard
      id={card}
      className={cn(
        'w-[4.1rem] text-sm md:w-24 md:text-lg',
        from === 'top' ? 'animate-land-from-top' : 'animate-land-from-bottom',
      )}
    />
  )
}

function seatName(seat: number, others: Seat[], me: Seat | null): string {
  if (me?.seat === seat) return me.name
  return others.find((other) => other.seat === seat)?.name ?? ''
}
