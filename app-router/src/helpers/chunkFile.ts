const MAX_CHUNK_SIZE = (1024 * 1024) * 3; // 1MB

export const createFileChunks = (file: File) => {
  const chunks = [];
  let start = 0;

  while (start < file.size) {
    const end = start + MAX_CHUNK_SIZE;
    let chunk = file.slice(start, end, 'application/octet-stream');

    chunks.push(chunk);
    start = end;
  }
  return chunks;
};