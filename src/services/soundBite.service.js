import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import * as fsRepository from '../repositories/fs.repository.js';
import * as aws from '../config/aws.config.js';
import * as ffmpeg from './ffmpeg.service.js';
import { config } from '../config/config.js';
import * as youTubeRepository from '../repositories/youtube.repository.js';
import Soundbite from '../models/soundbite.model.js';
import User from '../models/user.model.js';


export async function getByUser(userSub) {
  const user = await User.findOne({ where: { externalId: userSub } });
  if (!user) return [];
  return Soundbite.findAll({ where: { userId: user.id } });
}

export async function remove(id, userSub) {
  const user = await User.findOne({ where: { externalId: userSub } });
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });

  const soundbite = await Soundbite.findOne({ where: { id, userId: user.id } });
  if (!soundbite) throw Object.assign(new Error('Soundbite not found'), { statusCode: 404 });

  await soundbite.destroy();
}

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

    const soundbite = await Soundbite.create({
      id: uuidv4(),
      filename: uploadResult.Location,
      userId,
    });

    return soundbite;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
