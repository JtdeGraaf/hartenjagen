import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { joinLink } from '@/lib/game-code'
import { qrCodeFor } from '@/lib/qr-code'

/** The four words and a QR code, pencilled on the notepad for friends to read aloud or scan. */
export function CodeCard({ code }: { code: string }) {
  const { t } = useTranslation()
  const qr = useMemo(() => qrCodeFor(joinLink(location.origin, code)), [code])
  return (
    <section aria-label={t('table.codeLabel')} className="grid justify-items-center gap-3 text-center">
      <p className="text-lettered flex flex-wrap justify-center gap-x-3 text-4xl text-band">
        {code.split('-').map((word) => (
          <span key={word}>{word}</span>
        ))}
      </p>
      <p className="font-semibold text-pencil">{t('table.codeHow')}</p>
      <svg
        viewBox={`-2 -2 ${qr.size + 4} ${qr.size + 4}`}
        role="img"
        aria-label={t('table.qrLabel')}
        className="w-40 rounded-md bg-card"
      >
        <path d={qr.path} className="fill-card-ink" />
      </svg>
      <p className="max-w-xs text-sm text-pencil-soft">{t('table.unsafe')}</p>
    </section>
  )
}
