import { AlertDialog } from '@base-ui/react/alert-dialog'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './button'

type ConfirmDialogProps = {
  open: boolean
  title: string
  children: ReactNode
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}

/** Asks before something that's hard to take back. The confirm button names the action, never "OK". */
export function ConfirmDialog({ open, title, children, confirmLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  const { t } = useTranslation()
  return (
    <AlertDialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 bg-band/60" />
        <AlertDialog.Popup className="notepad fixed top-1/2 left-1/2 w-[min(24rem,calc(100vw-2rem))] -translate-1/2 rounded-md p-6 pl-12">
          <AlertDialog.Title className="text-lettered mb-2 text-2xl text-band">{title}</AlertDialog.Title>
          <AlertDialog.Description render={<div />} className="text-pencil">
            {children}
          </AlertDialog.Description>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <AlertDialog.Close render={<Button look="quiet" />}>{t('common.stay')}</AlertDialog.Close>
            <Button onClick={onConfirm}>{confirmLabel}</Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
