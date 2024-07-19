import { ZodError } from 'zod'
import { FormState } from './types'

export function fromErrorToFormState(error: unknown): FormState {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      status: 'error' as const,
      message: 'There are items that require your attention.',
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    }
  }
  if (error instanceof Error) {
    return {
      status: 'error' as const,
      message: error.message,
      fieldErrors: {},
      timestamp: Date.now(),
    }
    // if not an error instance but something else crashed
    // return generic error message
  } else {
    return {
      status: 'error' as const,
      message: 'An unknown error occurred',
      fieldErrors: {},
      timestamp: Date.now(),
    }
  }
}

export function toFormState(
  status: FormState['status'],
  message: string
): FormState {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  }
}
