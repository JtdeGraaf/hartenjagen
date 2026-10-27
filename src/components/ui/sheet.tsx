import { Dialog } from '@base-ui/react/dialog'
import type { ReactNode } from 'react'

type SheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: ReactNode
  closeLabel: string
}

/** A notepad sheet slid over the table, for looking something up and putting it back. */
export function Sheet({ open, onOpenChange, title, children, closeLabel }: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-band/50 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="notepad fixed inset-x-3 top-6 bottom-6 mx-auto max-w-xl overflow-y-auto rounded-md p-5 pl-12 transition duration-300 ease-out data-[ending-style]:translate-y-8 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-8 data-[starting-style]:opacity-0">
          <div className="mb-3 flex items-start justify-between gap-3">
            <Dialog.Title className="text-lettered text-3xl text-band">{title}</Dialog.Title>
            <Dialog.Close className="rounded-full px-3 py-1 text-sm font-bold text-pencil hover:bg-band/10">
              {closeLabel}
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
