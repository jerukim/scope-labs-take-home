'use server'

import * as z from 'zod'
import { FormState, fromErrorToFormState, toFormState } from './form'
import { TAG, postComment } from './api'
import { revalidateTag } from 'next/cache'

export async function addComment(
  { videoId, userId }: { videoId: string; userId: string },
  formState: FormState,
  formData: FormData
) {
  try {
    const { comment } = z
      .object({
        comment: z
          .string()
          .min(1, 'Comment must be at least 1 character')
          .max(500, 'Comment must be less than 500 characters'),
      })
      .parse({ comment: formData.get('comment') })

    await postComment({
      video_id: videoId,
      content: comment,
      user_id: userId,
    })

    revalidateTag(TAG.comment)

    return toFormState('success', '')
  } catch (error) {
    return fromErrorToFormState(error)
  }
}
