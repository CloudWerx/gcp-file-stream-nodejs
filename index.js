import { streamFileToGCS } from './dist/streamFileToGCS.js'

const main = async () => {
  const fileUrl = 'https://example.com/file.txt'
  const bucketName = 'my-bucket-name'
  const filename = 'my-file.txt'

  return streamFileToGCS(fileUrl, bucketName, filename)
}

main()
  .then(() => console.log('done'))
  .catch((err) => console.error(err))
