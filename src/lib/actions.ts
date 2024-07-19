'use server'

import { revalidateTag } from 'next/cache'
import { postComment, postVideo } from './api'
import { fromErrorToFormState, toFormState } from './form'
import { CommentSchema, VideoSchema } from './schema'
import { TAG } from './constants'

import type { FormState } from './types'

export async function addComment(
  { videoId, userId }: { videoId: string; userId: string },
  formState: FormState,
  formData: FormData
) {
  try {
    const { comment } = CommentSchema.parse({
      comment: formData.get('comment'),
    })

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

export async function uploadVideo(
  formState: FormState,
  formData: FormData
) {
  try {
    const body = VideoSchema.parse({
      user_id: formData.get('user_id'),
      description: formData.get('description'),
      video_url: formData.get('video_url'),
      title: formData.get('title'),
    })

    await postVideo(body)

    revalidateTag(TAG.video)

    return toFormState('success', '')
  } catch (error) {
    return fromErrorToFormState(error)
  }
}
