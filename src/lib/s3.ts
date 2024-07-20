import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Readable } from 'stream'
import { File } from 'buffer'

if (!process.env.AWS_ACCESS_KEY_ID)
  throw new Error('`AWS_ACCESS_KEY_ID` is a required env variable')
if (!process.env.AWS_SECRET_ACCESS_KEY)
  throw new Error(
    '`AWS_SECRET_ACCESS_KEY` is a required env variable'
  )
if (!process.env.AWS_BUCKET_REGION)
  throw new Error('`AWS_BUCKET_REGION` is a required env variable')
if (!process.env.AWS_BUCKET_NAME)
  throw new Error('`AWS_BUCKET_NAME` is a required env variable')

export const accessKeyId = process.env.AWS_ACCESS_KEY_ID
export const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
export const region = process.env.AWS_BUCKET_REGION
export const bucket = process.env.AWS_BUCKET_NAME

export const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
})
