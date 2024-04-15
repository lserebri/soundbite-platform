import ytdl from 'ytdl-core';
import { config } from '../config/config.js';

import { createWriteStream } from './fs.repository.js'

export async function downloadAudio(videoURL) {
  const audioStream = ytdl(videoURL, { filter: 'audioonly' });

  const fileWriteStream = createWriteStream(config.tempFilePath);

  audioStream.pipe(fileWriteStream);

  return fileWriteStream;
}