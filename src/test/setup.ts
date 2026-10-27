import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { setUpTranslations } from '@/i18n/i18n'

await setUpTranslations('en')

afterEach(() => cleanup())
