import { exec } from 'child_process';


export function trimFile(tempDir, inputFilePath, timeRange) {
  const outputFilePath = `${tempDir}/output.mp4`;
  console.log(`ffmpeg -i ${inputFilePath} -ss ${timeRange.startTime} -to ${timeRange.endTime} -c:v copy -c:a copy ${outputFilePath}`)
  const command = `ffmpeg -i ${inputFilePath} -ss ${timeRange.startTime} -to ${timeRange.endTime} -c:v copy -c:a copy ${outputFilePath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error trimming video: ${error.message}`);
      return;
    }
    console.log('Video trimmed successfully');
  });
}