import { existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { basename, extname, join } from "path";

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

export function removeFileExtension(filePath: string): string {
  return basename(filePath, extname(filePath));
}

export function ensureDirectoryExists(directoryPath: string) {
  if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath, { recursive: true });
  }
}
