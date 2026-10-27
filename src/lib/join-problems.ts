import type { TypedCode } from './game-code'

/** What can go wrong when joining a table. Each code has an `errors.<code>` key in every locale. */
export type JoinProblem =
  | { code: 'wrongWordCount'; wordCount: number }
  | { code: 'unknownWords'; unknownWords: string[] }
  | { code: 'notStarted' }
  | { code: 'offline' }

export const JOIN_PROBLEM_CODES = [
  'wrongWordCount',
  'unknownWords',
  'notStarted',
  'offline',
] as const satisfies readonly JoinProblem['code'][]

export function problemWithTypedCode(typed: TypedCode): JoinProblem | null {
  if (typed.status === 'ok') return null
  if (typed.status === 'wrong-word-count') return { code: 'wrongWordCount', wordCount: typed.wordCount }
  return { code: 'unknownWords', unknownWords: typed.unknownWords }
}
