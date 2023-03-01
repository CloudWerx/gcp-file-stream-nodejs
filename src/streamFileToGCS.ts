import unzipper from 'unzipper'
import stripBOM from 'strip-bom-stream'

import { storage } from './storage.js'
import { getFetchStream } from './getFetchStream.js'

export const streamFileToGCS = async (
  url: string,
  bucketName: string,
  fileName: string,
  zipped = false,
) => {
  console.log(`Streaming ${url} to ${bucketName}`)

  const bucket = storage.bucket(bucketName)
  const file = bucket.file(fileName)
  const writeStream = file.createWriteStream()

  const httpStream = await getFetchStream(url)

  if (!httpStream) throw new Error('Unable to create stream from URL')

  if (zipped) {
    const currentStream = httpStream
      .pipe(unzipper.ParseOne())
      .pipe(stripBOM())
      .pipe(writeStream)

    return new Promise((resolve, reject) => {
      currentStream.on('end', () => {
        console.log('Stream to GCS ended')
        resolve(null)
      })

      currentStream.on('finish', () => {
        console.log('Stream to GCS finished')
        resolve(null)
      })

      currentStream.on('error', (err: unknown) => {
        console.error(err)
        reject(err)
      })
    })
  } else {
    const currentStream = httpStream
      .pipe(stripBOM())
      .pipe(writeStream)

    return new Promise((resolve, reject) => {
      currentStream.on('end', () => {
        console.log('Stream to GCS ended')
        resolve(null)
      })

      currentStream.on('finish', () => {
        console.log('Stream to GCS finished')
        resolve(null)
      })

      currentStream.on('error', (err: unknown) => {
        console.error(err)
        reject(err)
      })
    })
  }
}
