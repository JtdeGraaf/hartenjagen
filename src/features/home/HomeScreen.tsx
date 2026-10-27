import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PlayingCard } from '@/components/PlayingCard'
import { Button } from '@/components/ui/button'
import { LanguageSwitch } from '@/components/ui/language-switch'
import { TextField } from '@/components/ui/text-field'
import { useStartOrJoin } from '@/features/table/useStartOrJoin'
import { useThisDevice } from '@/features/table/useThisDevice'
import { homeFormSchema, type HomeForm } from './home-form'
import { JoinProblemText } from './JoinProblemText'
import { useJoinLink } from './useJoinLink'

const FANNED_HAND = ['7H', 'QS', 'JC', 'AH', 'KD']
/** Each card's tilt in the fan, outermost first. */
const FAN_TILTS = [
  '-rotate-[14deg] translate-y-3',
  '-rotate-[7deg] translate-y-1',
  'rotate-0',
  'rotate-[7deg] translate-y-1',
  'rotate-[14deg] translate-y-3',
]

/** Put your name down, then join a table with four words or set up a new one. */
export function HomeScreen() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { device, rememberName, enterGame } = useThisDevice()
  const { linkedCode, clearLink } = useJoinLink()
  const { busy, problem, start, join } = useStartOrJoin((code, name) => {
    rememberName(name)
    enterGame(code)
    clearLink()
    void navigate({ to: '/table' })
  })
  const form = useForm<HomeForm>({
    resolver: zodResolver(homeFormSchema),
    defaultValues: { name: device.name ?? '', words: linkedCode?.replaceAll('-', ' ') ?? '' },
  })
  const nameError = form.formState.errors.name?.message

  return (
    <main className="mx-auto grid max-w-md gap-6 overflow-x-clip px-4 pt-4 pb-12">
      <div className="flex justify-end">
        <LanguageSwitch />
      </div>
      <header className="grid justify-items-center gap-2 pt-2">
        <div className="flex h-32 items-end justify-center" aria-hidden="true">
          {FANNED_HAND.map((card, index) => (
            <PlayingCard key={card} id={card} className={`-mx-2.5 w-[4.2rem] origin-bottom ${FAN_TILTS[index]}`} />
          ))}
        </div>
        <h1 className="text-lettered text-5xl text-band-ink drop-shadow-[0_3px_6px_rgb(59_36_24/0.65)]">
          {t('meta.appName')}
        </h1>
        <p className="max-w-xs rounded-full bg-band/85 px-4 py-1 text-center text-sm font-semibold text-band-ink">
          {t('home.pitch')}
        </p>
      </header>

      <form
        className="notepad grid gap-4 rounded-md p-5 pl-12"
        onSubmit={form.handleSubmit(({ name, words }) => join(name, words))}
      >
        <TextField
          label={t('home.name')}
          autoComplete="given-name"
          error={nameError && t(nameError as 'home.nameRequired')}
          {...form.register('name')}
        />
        <TextField
          label={t('home.words')}
          placeholder={t('home.wordsExample')}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          {...form.register('words')}
        />
        {problem && <JoinProblemText problem={problem} />}
        <Button type="submit" disabled={busy !== null}>
          {busy === 'joining' ? t('home.joining') : t('home.join')}
        </Button>
        <div className="flex items-center gap-3 text-sm font-bold text-pencil-soft">
          <span className="h-px flex-1 bg-pencil-soft/40" />
          {t('home.or')}
          <span className="h-px flex-1 bg-pencil-soft/40" />
        </div>
        <Button
          type="button"
          look="quiet"
          disabled={busy !== null}
          onClick={form.handleSubmit(({ name }) => start(name))}
        >
          {busy === 'starting' ? t('home.starting') : t('home.start')}
        </Button>
        <p className="text-sm text-pencil-soft">{t('home.players')}</p>
      </form>
    </main>
  )
}
