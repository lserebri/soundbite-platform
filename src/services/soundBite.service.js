import fs from 'fs';
import ytdl from 'ytdl-core';
import path from 'path';

import * as aws from '../config/aws.config.js'
import * as ffmpeg from './ffmpeg.service.js'

export async function create(videoURL, timeRange, soundBiteName, userId) {
  const tempDir = path.join(process.cwd(), '/tempDir');
  const fileName = 'rawAudio.mp3';
  const filePath = `${tempDir}/${fileName}`;

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  console.log(`Downloading video from ${videoURL}`);

  const videoStream = ytdl(videoURL, { filter: 'audioonly' });
  const fileWriteStream = fs.createWriteStream(filePath);
  let trimmedFilePath;

  videoStream.pipe(fileWriteStream);

  fileWriteStream.on('finish', async () => {
    console.log(`File saved to: ${filePath}`);
    try {
      trimmedFilePath = await ffmpeg.trimFile(tempDir, filePath, timeRange);

      console.log(`1. trimmedFilePath: ${trimmedFilePath}`);

      const s3Params = {
        Bucket: 'soundbite-app-bucket',
        Key: `users/${userId}/soundbites/${soundBiteName}`, // Specify the S3 key for the trimmed file
        Body: fs.createReadStream(trimmedFilePath)
      };

      const uploadResult = await aws.s3.upload(s3Params).promise();
      console.log('File uploaded to S3:', uploadResult.Location);
    } catch (error) {
      console.error('Error trimming video:', error);
    }
  });

  return 'message';
}
