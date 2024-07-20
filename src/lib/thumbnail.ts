import ffmpeg from 'fluent-ffmpeg'
import { readFile, unlink } from 'fs/promises'
import { Readable } from 'stream'

export function generateThumbnail(
  filename: string,
  readableFileStream: Readable
) {
  async function cleanup() {
    await unlink(`./${filename}`)
  }

  return new Promise<{
    filename: string
    cleanup: () => void
    buffer: Buffer
  }>((resolve, reject) =>
    ffmpeg(readableFileStream)
      .on('error', (err) => {
        console.log(`[ffmpeg] error: ${err.message}`)
        reject(err)
      })
      .on('end', async () => {
        readableFileStream.destroy()
        const buffer = await readFile(`./${filename}`)
        resolve({ filename, cleanup, buffer })
      })
      .screenshot({
        timestamps: ['1:00'],
        filename, // Creates a temporary file
      })
  )
}
