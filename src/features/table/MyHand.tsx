import { Button as BaseButton } from '@base-ui/react/button'
import { useTranslation } from 'react-i18next'
import { PlayingCard } from '@/components/PlayingCard'
import { useCardName } from '@/components/useCardName'
import { fanPosition } from '@/lib/fan'
import { cn } from '@/lib/utils'

type MyHandProps = { cards: string[]; playable: string[]; onPlay: (card: string) => void }

/** Your cards held as a fan along the bottom edge. On your turn the cards you may play rise; the rest sink and grey. */
export function MyHand({ cards, playable, onPlay }: MyHandProps) {
  const { t } = useTranslation()
  const nameOf = useCardName()
  const isMyTurn = playable.length > 0
  return (
    <ul aria-label={t('table.yourHand')} className="flex justify-center px-4 pt-6 pb-2">
      {cards.map((card, index) => {
        const canPlay = playable.includes(card)
        const { tilt, drop } = fanPosition(index, cards.length)
        return (
          <li key={card} className={cn('-mx-[1.35rem] origin-bottom md:-mx-6', tilt, drop)}>
            <BaseButton
              disabled={!canPlay}
              onClick={() => onPlay(card)}
              aria-label={canPlay ? t('table.play', { card: nameOf(card) }) : nameOf(card)}
              className={cn(
                'block rounded-[var(--radius-card)] transition duration-200 ease-out',
                canPlay && '-translate-y-4 hover:-translate-y-6 focus-visible:-translate-y-6',
                isMyTurn && !canPlay && 'translate-y-2 brightness-[0.82] saturate-[0.4]',
              )}
            >
              <PlayingCard id={card} className="w-[4.75rem] text-base md:w-28 md:text-xl" />
            </BaseButton>
          </li>
        )
      })}
    </ul>
  )
}
