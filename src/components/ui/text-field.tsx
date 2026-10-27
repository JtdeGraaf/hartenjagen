import { Field } from '@base-ui/react/field'
import { Input } from '@base-ui/react/input'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type TextFieldProps = Omit<ComponentProps<typeof Input>, 'className'> & {
  label: string
  error?: string
  className?: string
}

/** A labelled text input on paper, with its error underneath. */
export function TextField({ label, error, className, ...props }: TextFieldProps) {
  return (
    <Field.Root invalid={error !== undefined} className={cn('grid gap-1', className)}>
      <Field.Label className="text-sm font-bold text-pencil">{label}</Field.Label>
      <Input
        className="w-full rounded-lg border-2 border-card-edge bg-card px-3 py-2.5 text-lg text-card-ink placeholder:text-pencil-soft focus-visible:border-band focus-visible:outline-none data-[invalid]:border-problem"
        {...props}
      />
      {error && (
        <Field.Error match className="text-sm font-semibold text-problem">
          {error}
        </Field.Error>
      )}
    </Field.Root>
  )
}
