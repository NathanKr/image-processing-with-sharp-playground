import sharp, { OutputInfo } from "sharp";
import { WEBP_EXTENSION } from "../constants";
import {
  ensureDirectoryExists,
  getAllFilesRecursively,
} from "./gen-file-utils";
import { dirname, join, relative } from "path";
import IConvertAllResult from "./i-convert-all-result";
import IErrorFile from "./i-error-file";

/**
 * Go recuresively but skip all ready existing webp files
 * Create directory on target if needed
 * @param sourceRootDirectory
 * @param targetRootDirectory
 */
export async function convertRecursivelyToWebP(
  sourceRootDirectory: string,
  targetRootDirectory: string
): Promise<IConvertAllResult> {
  const allFiles = getAllFilesRecursively(sourceRootDirectory, WEBP_EXTENSION);
  const res: IConvertAllResult = {
    numAllFile: allFiles.length,
    errorFiles: [],
  };

  for (const sourceFile of allFiles) {
    const relativePath = relative(sourceRootDirectory, sourceFile);
    const targetFile = join(
      targetRootDirectory,
      relativePath.replace(/\.[^/.]+$/, `.${WEBP_EXTENSION}`)
    );

    ensureDirectoryExists(dirname(targetFile)); // Ensure the parent directory exists

    try {
      await convertToWebP(sourceFile, targetFile);
    } catch (err) {
      const errorFile: IErrorFile = {
        fileNameSource: sourceFile,
        err,
      };
      res.errorFiles.push(errorFile);
    }
  }

  return res;
}

async function convertToWebP(
  inputImagePath: string,
  outputImagePath: string
): Promise<OutputInfo> {
  return sharp(inputImagePath).webp().toFile(outputImagePath);
}
