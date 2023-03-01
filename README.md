# GCP File Stream NodeJS
File stream utility built in Typescript / NodeJS. Streams remote file ( zipped or unzipped ) to a GCS Cloud Storage Bucket.

# Example
The current example can be found in the [index.js](./index.js) file. It utilizes the built streamFileToGCS function from the `dist` directory.

The [streamFileToGCS function](./src/streamFileToGCS.ts) has the following signature:

```js
/**
 *
 * @param {string} url - URL to stream from
 * @param {string} bucketName - GCS bucket name
 * @param {string} fileName - GCS file name
 * @param {boolean} [zipped=false] - Whether the file is zipped
 * @returns Promise<null>
 */
export const streamFileToGCS = async (
  url: string,
  bucketName: string,
  fileName: string,
  zipped = false,
) => {
...
}

```
