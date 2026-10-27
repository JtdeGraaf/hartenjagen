import { useLocation, useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { codeInLink } from '@/lib/game-code'

/** The words from a scanned join link (`#join=…`). They sit after # so no server ever sees them. */
export function useJoinLink() {
  const hash = useLocation({ select: (location) => location.hash })
  const navigate = useNavigate()
  const clearLink = useCallback(() => void navigate({ to: '.', hash: '', replace: true }), [navigate])
  return { linkedCode: codeInLink(hash), clearLink }
}
