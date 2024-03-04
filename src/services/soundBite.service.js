import fs from 'fs';
import ytdl from 'ytdl-core';
import path from 'path';

import * as ffmpeg from './ffmpeg.service.js'

export async function create(videoURL, timeRange) {
  const tempDir = path.join(process.cwd(), '/tempDir');
  const fileName = 'rawAudio.mp3';
  const filePath = `${tempDir}/${fileName}`;

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  console.log(`Downloading video from ${videoURL}`);

  const videoStream = ytdl(videoURL, { filter: 'audioonly' });
  const fileWriteStream = fs.createWriteStream(filePath);

  videoStream.pipe(fileWriteStream);

  fileWriteStream.on('finish', () => {
    console.log(`File saved to: ${filePath}`);
    ffmpeg.trimFile(tempDir, filePath, timeRange);
  });

  return 'message';
}