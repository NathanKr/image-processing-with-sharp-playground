import sharp, { OutputInfo } from "sharp";
import { WEBP_EXTENSION } from "../constants";
import {
  ensureDirectoryExists,
  getAllFilesRecursively,
} from "./gen-file-utils";
import { dirname, join, relative } from "path";

/**
 * Go recuresively but skip all ready existing webp files
 * Create directory on target if needed
 * @param sourceRootDirectory 
 * @param targetRootDirectory 
 */
export async function convertRecursivelyToWebP(
  sourceRootDirectory: string,
  targetRootDirectory: string
) {
  const allFiles = getAllFilesRecursively(sourceRootDirectory, WEBP_EXTENSION);

  for (const sourceFile of allFiles) {
    const relativePath = relative(sourceRootDirectory, sourceFile);
    const targetFile = join(
      targetRootDirectory,
      relativePath.replace(/\.[^/.]+$/, `.${WEBP_EXTENSION}`)
    );

    ensureDirectoryExists(dirname(targetFile)); // Ensure the parent directory exists
    console.log(sourceFile,targetFile);
    

    await convertToWebP(sourceFile, targetFile);
  }
}

async function convertToWebP(
  inputImagePath: string,
  outputImagePath: string
): Promise<OutputInfo> {
  return sharp(inputImagePath).webp().toFile(outputImagePath);
}
