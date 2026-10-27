import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { LanguageSwitch } from '@/components/ui/language-switch'
import { Sheet } from '@/components/ui/sheet'
import type { TableView } from '@/lib/table-view'
import { cn } from '@/lib/utils'
import { CodeCard } from './CodeCard'
import { GameOver } from './GameOver'
import { PlayArea } from './PlayArea'
import { ScorePad } from './ScorePad'
import { leaveSharedSpace } from './shared-space'
import { useTable } from './useTable'
import { useThisDevice } from './useThisDevice'
import { WaitingTable } from './WaitingTable'

type Panel = 'score' | 'invite' | 'leave' | null

/** Sitting at the table: the bar along the top, and whatever the game is doing now. */
export function TableScreen({ code, name }: { code: string; name: string }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { device, forgetGame } = useThisDevice()
  const { isOpening, isOnline, view, startGame, deal, playCard } = useTable(code, { id: device.playerId, name })
  const [panel, setPanel] = useState<Panel>(null)

  async function leave() {
    await leaveSharedSpace(code)
    forgetGame()
    void navigate({ to: '/' })
  }

  return (
    <main className="mx-auto max-w-xl px-3 md:max-w-3xl">
      <header className="flex items-center gap-2 py-3">
        <span className="text-lettered rounded-full bg-band px-3 py-1 text-lg text-band-ink">{t('meta.appName')}</span>
        <span
          role="status"
          title={isOnline ? t('table.connected') : t('table.reconnecting')}
          className={cn('mr-auto size-2.5 rounded-full ring-2 ring-band', isOnline ? 'bg-leaf' : 'bg-band-ink-soft')}
        >
          <span className="sr-only">{isOnline ? t('table.connected') : t('table.reconnecting')}</span>
        </span>
        <Button look="onCloth" width="fit" onClick={() => setPanel('score')}>
          {t('table.scoreShort')}
        </Button>
        <Button look="onCloth" width="fit" onClick={() => setPanel('invite')}>
          {t('table.inviteShort')}
        </Button>
      </header>

      <TableBody
        isOpening={isOpening}
        view={view}
        code={code}
        onStart={startGame}
        onDeal={deal}
        onPlay={playCard}
        onOpenScore={() => setPanel('score')}
      />

      <footer className="flex items-center justify-center gap-3 py-4">
        <LanguageSwitch />
        <Button look="onCloth" width="fit" onClick={() => setPanel('leave')}>
          {t('table.leave')}
        </Button>
      </footer>

      {view && (
        <Sheet
          open={panel === 'score'}
          onOpenChange={(open) => setPanel(open ? 'score' : null)}
          title={t('score.title')}
          closeLabel={t('common.close')}
        >
          <ScorePad view={view} />
        </Sheet>
      )}
      <Sheet
        open={panel === 'invite'}
        onOpenChange={(open) => setPanel(open ? 'invite' : null)}
        title={t('table.inviteTitle')}
        closeLabel={t('common.close')}
      >
        <CodeCard code={code} />
      </Sheet>
      <ConfirmDialog
        open={panel === 'leave'}
        title={t('table.leaveTitle')}
        confirmLabel={t('table.leave')}
        onConfirm={() => void leave()}
        onCancel={() => setPanel(null)}
      >
        <p>{t('table.leaveText', { words: code.replaceAll('-', ' ') })}</p>
      </ConfirmDialog>
    </main>
  )
}

type TableBodyProps = {
  isOpening: boolean
  view: TableView | null
  code: string
  onStart: () => void
  onDeal: () => void
  onPlay: (card: string) => void
  onOpenScore: () => void
}

function TableBody({ isOpening, view, code, onStart, onDeal, onPlay, onOpenScore }: TableBodyProps) {
  const { t } = useTranslation()
  if (isOpening) return <p className="py-16 text-center font-semibold text-band-ink">{t('table.opening')}</p>
  if (!view) return <p className="py-16 text-center font-semibold text-band-ink">{t('table.arriving')}</p>
  if (view.phase === 'waiting') return <WaitingTable view={view} code={code} onStart={onStart} />
  if (view.phase === 'finished') return <GameOver view={view} onNewGame={onStart} />
  return <PlayArea view={view} onDeal={onDeal} onPlay={onPlay} onOpenScore={onOpenScore} />
}
