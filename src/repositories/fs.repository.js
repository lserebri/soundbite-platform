import fs from 'fs';

export function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}

export async function removeFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return;
    }
    // TODO: Implement logger instead
    console.log('File deleted successfully');
  });
}

export function createWriteStream(filePath) {
  return fs.createWriteStream(filePath);
}

export function createReadStream(filePath) {
  return fs.createReadStream(filePath);
}