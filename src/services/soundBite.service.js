import path from 'path';

import * as fsRepository from '../repositories/fs.repository.js';
import * as aws from '../config/aws.config.js';
import * as ffmpeg from './ffmpeg.service.js';
import { config } from '../config/config.js';
import * as youTubeRepository from '../repositories/youtube.repository.js';


export async function create(videoURL, timeRange, soundBiteName, userId) {
  try {
    fsRepository.createDirectory(config.tempDir);

    const tempFilePath = config.tempFilePath;
    const audioWriteStream = await youTubeRepository.downloadAudio(videoURL);

    await new Promise((resolve, reject) => {
      audioWriteStream.on('finish', resolve);
      audioWriteStream.on('error', reject);
    });

    const trimmedFilePath = await ffmpeg.trimFile(config.tempDir, tempFilePath, timeRange);

    await fsRepository.removeFile(tempFilePath);

    const s3Params = {
      Bucket: config.s3BucketName,
      Key: `users/${userId}/soundbites/${soundBiteName}`,
      Body: fsRepository.createReadStream(trimmedFilePath),
    };

    const uploadResult = await aws.s3.upload(s3Params).promise();
    //TODO: Save S3 file path to db.
    
    return 'message';
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
