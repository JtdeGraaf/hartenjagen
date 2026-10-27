import { useCallback, useState } from 'react'
import { loadThisDevice, saveThisDevice, type ThisDevice } from '@/lib/this-device'

/** Who plays on this phone and which game it is in, remembered across visits. */
export function useThisDevice() {
  const [device, setDevice] = useState<ThisDevice>(() => loadThisDevice(localStorage))

  const update = useCallback((change: Partial<ThisDevice>) => {
    setDevice((current) => {
      const next = { ...current, ...change }
      saveThisDevice(localStorage, next)
      return next
    })
  }, [])

  return {
    device,
    rememberName: useCallback((name: string) => update({ name }), [update]),
    enterGame: useCallback((code: string) => update({ code }), [update]),
    forgetGame: useCallback(() => update({ code: null }), [update]),
  }
}
