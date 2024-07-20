'use server'

import { revalidateTag } from 'next/cache'
import { Readable } from 'stream'

import { postComment, postVideo } from './api'
import { TAG } from './constants'
import { fromErrorToFormState, toFormState } from './form'
import { CommentSchema, VideoSchema } from './schema'
import { uuidv4 } from './utils'
import { generateThumbnail } from './thumbnail'
import { bucket, region, s3Client } from './s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'

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

    revalidateTag(TAG.comments)
    revalidateTag(TAG.video)
    revalidateTag(TAG.videos)

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

    const fileName = uuidv4()

    const handleVideo = async () =>
      s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: `${fileName}.mp4`,
          Body: Readable.from(videoFile.stream()),
          ContentType: videoFile.type,
          ContentLength: videoFile.size,
        })
      )

    const handleThumbnail = async () => {
      const thumbnail = await generateThumbnail(
        `${fileName}.png`,
        Readable.from(videoFile.stream())
      )
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: thumbnail.filename,
          Body: thumbnail.buffer,
          ContentType: 'image/png',
          ContentLength: thumbnail.buffer.byteLength,
        })
      )
      await thumbnail.cleanup()
    }

    await Promise.all([handleVideo(), handleThumbnail()])

    await postVideo({
      user_id,
      title,
      description,
      video_url: `https://${bucket}.s3.${region}.amazonaws.com/${fileName}.mp4`,
    })

    revalidateTag(TAG.videos)

    return toFormState('success', '')
  } catch (error) {
    return fromErrorToFormState(error)
  }
}
