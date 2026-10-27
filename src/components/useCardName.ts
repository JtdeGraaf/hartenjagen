import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { readCard } from '@/lib/cards'

/** A card's spoken name in the current language: "queen of spades", "schoppenvrouw". */
export function useCardName() {
  const { t } = useTranslation()
  return useCallback(
    (id: string) => {
      const card = readCard(id)
      if (!card) return id
      return t('cards.name', { rank: t(`cards.rank.${card.rank}`), suit: t(`cards.suit.${card.suit}`) })
    },
    [t],
  )
}
