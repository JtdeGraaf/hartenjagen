import { Button as BaseButton } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition duration-150 ease-out disabled:cursor-default disabled:opacity-45 data-[disabled]:cursor-default data-[disabled]:opacity-45',
  {
    variants: {
      look: {
        /** A chunky enamel-tin button, for the one thing to do now. */
        primary:
          'rounded-xl bg-band px-5 py-3 text-lg text-band-ink shadow-card enabled:hover:-translate-y-px enabled:hover:shadow-lifted enabled:active:translate-y-0',
        quiet: 'rounded-xl bg-band/10 px-5 py-3 text-lg text-band enabled:hover:bg-band/20',
        onCloth: 'rounded-full bg-band/85 px-3 py-1.5 text-sm text-band-ink enabled:hover:bg-band',
      },
      width: { full: 'w-full', fit: 'w-fit' },
    },
    defaultVariants: { look: 'primary', width: 'full' },
  },
)

type ButtonProps = Omit<ComponentProps<typeof BaseButton>, 'className'> &
  VariantProps<typeof buttonVariants> & { className?: string }

export function Button({ look, width, className, ...props }: ButtonProps) {
  return <BaseButton className={cn(buttonVariants({ look, width }), className)} {...props} />
}
