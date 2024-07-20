import type { FormState } from './types'

export const USER_ID = 'jeru_kim2'

export const API_BASE_URL =
  'https://take-home-assessment-423502.uc.r.appspot.com/api'

export const TAG = {
  comments: 'comments',
  videos: 'videos',
}

export const EMPTY_FORM_STATE: FormState = {
  status: 'unset' as const,
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
}
