import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const tempFileName = uuidv4();
const tempDir =  path.join(process.cwd(), '/tempDir');


export const config = {
  tempDir: tempDir,
  tempFilePath: `${tempDir}/${tempFileName}`,
  s3BucketName: process.env.AWS_S3_BUCKET,
}