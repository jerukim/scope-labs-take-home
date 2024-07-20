'use server'

import { revalidateTag } from 'next/cache'
import ffmpeg from 'fluent-ffmpeg'
import { postComment, postVideo } from './api'
import { bucket, region, s3Client } from './s3'
import { fromErrorToFormState, toFormState } from './form'
import { uuidv4 } from './utils'
import { CommentSchema, VideoSchema } from './schema'
import { TAG } from './constants'

import type { FormState } from './types'
import { Readable } from 'stream'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { readFile, unlink } from 'fs/promises'

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

    const videoFileName = `${uuidv4()}.mp4`
    const thumbnailFileName = videoFileName.replace('mp4', 'png')

    const videoUploadStream = Readable.from(videoFile.stream())
    const videoThumbnailStream = Readable.from(videoFile.stream())

    await Promise.all([
      s3Client
        .send(
          new PutObjectCommand({
            Bucket: bucket,
            Key: videoFileName,
            Body: videoUploadStream,
            ContentType: videoFile.type,
            ContentLength: videoFile.size,
          })
        )
        .then(() => videoUploadStream.destroy()),
      new Promise<void>((resolve, reject) =>
        ffmpeg(videoThumbnailStream)
          .on('error', (err) => {
            console.log(`[ffmpeg] error: ${err.message}`)
            reject(err)
          })
          .on('end', async () => {
            videoThumbnailStream.destroy()

            const thumbnailFile = await readFile(
              `./${thumbnailFileName}`
            )

            await s3Client.send(
              new PutObjectCommand({
                Bucket: bucket,
                Key: thumbnailFileName,
                Body: thumbnailFile,
                ContentType: 'image/png',
                ContentLength: thumbnailFile.byteLength,
              })
            )

            await unlink(`./${thumbnailFileName}`)

            resolve()
          })
          .screenshot({
            timestamps: ['1:00'],
            filename: videoFileName.replace('mp4', 'png'),
          })
      ),
    ])

    const video_url = `https://${bucket}.s3.${region}.amazonaws.com/${videoFileName}`

    await postVideo({
      user_id,
      description,
      video_url,
      title,
    })

    revalidateTag(TAG.video)

    return toFormState('success', '')
  } catch (error) {
    return fromErrorToFormState(error)
  }
}
