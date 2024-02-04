import sharp, { OutputInfo } from "sharp";
import { WEBP_EXTENSION } from "../constants";
import {
  appendScaleFactorToFileName,
  ensureDirectoryExists,
  getAllFilesRecursively,
  replaceFileExtension,
} from "./gen-file-utils";
import { dirname, join, relative } from "path";
import IConvertAllResult from "./i-convert-all-result";
import IErrorFile from "./i-error-file";
import { getImageFullPathInImagesDir } from "./utils";
import IFileOptions from "@/types/i-file-options";

/**
 * Go recuresively but skip existing webp files
 * Create directories on target if needed
 * @param sourceRootDirectory
 * @param targetRootDirectory
 */
export async function convertImagesFilesRecursivelyToWebP(
  sourceRootDirectory: string,
  targetRootDirectory: string
): Promise<IConvertAllResult> {
  const options: IFileOptions = {
    type: "ignored",
    extension: WEBP_EXTENSION,
  };
  const allFiles = getAllFilesRecursively(sourceRootDirectory, options);
  const res: IConvertAllResult = {
    numAllFile: allFiles.length,
    errorFiles: [],
    numFileConvertions:0
  };

  for (const sourceFile of allFiles) {
    const relativePath = relative(sourceRootDirectory, sourceFile);
    const targetFile = join(
      targetRootDirectory,
      replaceFileExtension(relativePath, WEBP_EXTENSION)
    );

    ensureDirectoryExists(dirname(targetFile)); // Ensure the parent directory exists

    try {
      await convertToWebP(sourceFile, targetFile);
      res.numFileConvertions++;
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

/**
 * scale all webp files in sourceRootDirectory recuresively
 * put each target file in the same directory as the source file
 * @param sourceRootDirectory
 * @param scaleFactor
 * @returns
 */
export async function sacleWebPImagesFilesRecursively(
  sourceRootDirectory: string,
  scaleFactor: number
): Promise<IConvertAllResult> {
  const options: IFileOptions = {
    type: "include",
    extension: WEBP_EXTENSION,
  };
  const allFiles = getAllFilesRecursively(sourceRootDirectory, options);
  const res: IConvertAllResult = {
    numAllFile: allFiles.length,
    errorFiles: [],
    numFileConvertions: 0
  };

  for (const sourceFile of allFiles) {
    try {
      await scaleOneWithTargetName(sourceFile, scaleFactor);
      res.numFileConvertions++;
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

export async function scaleOneWithTargetName(
  sourceImageFullPath: string,
  scaleFactor: number
): Promise<{ outputInfo: OutputInfo; targetImageFullPath: string }> {
  const targetImageFullPath = appendScaleFactorToFileName(
    sourceImageFullPath,
    scaleFactor
  );
  // Get original image dimensions
  const outputInfo = await scaleOne(
    sourceImageFullPath,
    scaleFactor,
    targetImageFullPath
  );
  return { outputInfo, targetImageFullPath };
}

export async function scaleOne(
  sourceImageFullPath: string,
  scaleFactor: number,
  targetImageFullPath: string
): Promise<OutputInfo> {
  const { width } = await sharp(sourceImageFullPath).metadata();

  // Resize the image using sharp and await for the operation to finish
  return sharp(sourceImageFullPath)
    .resize({ width: Math.round(width! / scaleFactor) })
    .toFile(targetImageFullPath);
}
