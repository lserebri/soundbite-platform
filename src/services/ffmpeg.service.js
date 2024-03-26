import { exec } from 'child_process';


export async function trimFile(tempDir, inputFilePath, timeRange) {
  return new Promise((resolve, reject) => {
    const outputFilePath = `${tempDir}/output.mp4`;
    const command = `ffmpeg -y -i ${inputFilePath} -ss ${timeRange.startTime} -to ${timeRange.endTime} -c:v copy -c:a copy ${outputFilePath}`;



    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error trimming video: ${error.message}`);
        reject(error);
        return;
      }
      
      console.log('Video trimmed successfully');
      resolve(outputFilePath);
    });
  });
}
