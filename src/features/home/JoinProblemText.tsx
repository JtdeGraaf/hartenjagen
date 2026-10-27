import { useTranslation } from 'react-i18next'
import type { JoinProblem } from '@/lib/join-problems'

/** What went wrong joining, in the player's language. */
export function JoinProblemText({ problem }: { problem: JoinProblem }) {
  const { t } = useTranslation()
  return (
    <p role="alert" className="rounded-lg bg-problem/10 px-3 py-2 font-semibold text-problem">
      {describe(problem, t)}
    </p>
  )
}

function describe(problem: JoinProblem, t: ReturnType<typeof useTranslation>['t']): string {
  switch (problem.code) {
    case 'wrongWordCount':
      return t('errors.wrongWordCount', { count: problem.wordCount })
    case 'unknownWords':
      return t('errors.unknownWords', { words: problem.unknownWords.join(', '), count: problem.unknownWords.length })
    case 'notStarted':
      return t('errors.notStarted')
    case 'offline':
      return t('errors.offline')
  }
}
