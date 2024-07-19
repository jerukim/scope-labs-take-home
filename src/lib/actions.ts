'use server'

import { revalidateTag } from 'next/cache'
import { postComment, postVideo } from './api'
import { fromErrorToFormState, toFormState } from './form'
import { CommentSchema, VideoSchema } from './schema'
import { TAG } from './constants'

import type { FormState } from './types'
import { uploadFile } from './s3'
import { uuidv4 } from './utils'

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
    const { user_id, description, videoFile, title } =
      VideoSchema.parse({
        user_id: formData.get('user_id'),
        description: formData.get('description'),
        videoFile: formData.get('videoFile'),
        title: formData.get('title'),
      })

    const fileName = `${uuidv4()}.${videoFile.type.split('/').pop()}`

    const video_url = await uploadFile(fileName, videoFile)

    await postVideo({ user_id, description, video_url, title })

    revalidateTag(TAG.video)

    return toFormState('success', '')
  } catch (error) {
    return fromErrorToFormState(error)
  }
}
