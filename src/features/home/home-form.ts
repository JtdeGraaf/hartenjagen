import { z } from 'zod'
import { MAX_NAME_LENGTH } from '@/lib/players'

/** Messages are i18n keys, so the form speaks the player's language. */
export const homeFormSchema = z.object({
  name: z.string().trim().min(1, 'home.nameRequired').max(MAX_NAME_LENGTH, 'home.nameTooLong'),
  words: z.string(),
})

export type HomeForm = z.infer<typeof homeFormSchema>
