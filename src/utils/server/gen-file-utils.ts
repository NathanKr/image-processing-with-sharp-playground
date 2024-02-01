import { existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { basename, dirname, extname, join } from "path";

export function getAllFilesRecursively(
  directoryPath: string,
  ignoredExtension: string
): string[] {
  const files: string[] = [];

  function traverseDirectory(currentPath: string) {
    const items = readdirSync(currentPath);

    items.forEach((item) => {
      const fullPath = join(currentPath, item);
      const stats = statSync(fullPath);

      if (stats.isFile()) {
        // Check if the file has the ignored extension. fileExtension include .
        const fileExtension = extname(fullPath).toLowerCase();
        if (fileExtension !== `.${ignoredExtension}`) {
          files.push(fullPath);
        }
      } else if (stats.isDirectory()) {
        traverseDirectory(fullPath);
      }
    });
  }

  traverseDirectory(directoryPath);

  return files;
}

export function appendScaleFactorToFileName(
  filePath: string,
  scaleFactor: number
): string {
  // Split the file path into directory, name, and extension
  const directory = filePath.substring(0, filePath.lastIndexOf("/") + 1);
  const fileNameWithExtension = filePath.substring(
    filePath.lastIndexOf("/") + 1
  );
  const fileName = fileNameWithExtension.substring(
    0,
    fileNameWithExtension.lastIndexOf(".")
  );
  const fileExtension = fileNameWithExtension.substring(
    fileNameWithExtension.lastIndexOf(".")
  );

  // Append the scale factor to the file name
  const scaledFileName = `${fileName}-${scaleFactor}x`;

  // Combine the parts back into the modified file path
  const modifiedFilePath = `${directory}${scaledFileName}${fileExtension}`;

  return modifiedFilePath;
}

export function replaceFileExtension(
  filePath: string,
  newExtension: string
): string {
  // Use path module to manipulate file paths
  const directory = dirname(filePath);
  const fileName = basename(filePath, extname(filePath));

  // Combine the new file name with the new extension
  const newFileName = `${fileName}.${newExtension}`;

  // Create the new file path by combining the directory and the new file name
  const newFilePath = join(directory, newFileName);

  return newFilePath;
}

export function removeFileExtension(filePath: string): string {
  return basename(filePath, extname(filePath));
}

export function ensureDirectoryExists(directoryPath: string) {
  if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath, { recursive: true });
  }
}

export function getFileSizeKb(filePath: string): number {
  const stats = statSync(filePath);
  return stats.size / 1024;
}
