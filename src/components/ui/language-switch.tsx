import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import { useTranslation } from 'react-i18next'
import { switchLanguage } from '@/i18n/i18n'
import { LANGUAGES, parseLanguage } from '@/lib/language'

/** EN / NL, as two little enamel tabs. */
export function LanguageSwitch() {
  const { t, i18n } = useTranslation()
  return (
    <ToggleGroup
      value={[i18n.language]}
      onValueChange={(values) => {
        const picked = parseLanguage(values[0])
        if (picked) switchLanguage(picked)
      }}
      aria-label={t('common.language')}
      className="flex overflow-hidden rounded-full bg-band/85"
    >
      {LANGUAGES.map((language) => (
        <Toggle
          key={language}
          value={language}
          className="px-2.5 py-1.5 text-xs font-bold text-band-ink-soft uppercase data-[pressed]:bg-band-ink data-[pressed]:text-band"
        >
          {language}
        </Toggle>
      ))}
    </ToggleGroup>
  )
}
