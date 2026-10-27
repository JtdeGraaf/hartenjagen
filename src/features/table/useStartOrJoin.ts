import { useState } from 'react'
import { newGameCode, readGameCode } from '@/lib/game-code'
import { problemWithTypedCode, type JoinProblem } from '@/lib/join-problems'
import { isSharedTableStarted, OfflineError, startSharedTable } from './shared-space'

type Busy = 'starting' | 'joining' | null

/** Setting up a new table or joining one by its words. Either ends with the code to sit down at. */
export function useStartOrJoin(onEnter: (code: string, name: string) => void) {
  const [busy, setBusy] = useState<Busy>(null)
  const [problem, setProblem] = useState<JoinProblem | null>(null)

  async function start(name: string) {
    setBusy('starting')
    setProblem(null)
    const code = newGameCode()
    await startSharedTable(code)
    setBusy(null)
    onEnter(code, name)
  }

  async function join(name: string, typedCode: string) {
    const typed = readGameCode(typedCode)
    const codeProblem = problemWithTypedCode(typed)
    if (codeProblem !== null || typed.status !== 'ok') return setProblem(codeProblem)
    setBusy('joining')
    setProblem(null)
    try {
      if (!(await isSharedTableStarted(typed.code))) return setProblem({ code: 'notStarted' })
      onEnter(typed.code, name)
    } catch (error) {
      if (!(error instanceof OfflineError)) throw error
      setProblem({ code: 'offline' })
    } finally {
      setBusy(null)
    }
  }

  return { busy, problem, start, join }
}
