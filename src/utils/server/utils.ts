import path from "path";
import { IMAGES_DIR, LIONS_DIR, OUTPUT_DIR } from "../constants";
import { existsSync, mkdirSync } from "fs";
import { IReqFile } from "@/types/i-req-file";

export function getImageFullPathInImagesDir(info : IReqFile) : string{
  return path.join(getImagesDirInPublic(),info.filePathRelative);
}

export function getImagesDirInPublic(): string {
  return path.join(process.cwd(), "public", IMAGES_DIR);
}

export function getImagePathInLionsDir(imageFileNmae: string): string {
  return path.join(
    process.cwd(),
    "public",
    IMAGES_DIR,
    LIONS_DIR,
    imageFileNmae
  );
}

export function getExistingOutputDir(): string {
  const dir = path.join(process.cwd(), OUTPUT_DIR);

  // Create the directory if it doesn't exist
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  return dir;
}

export function getImagePathInOutputDir(imageFileNmae: string): string {
  return path.join(getExistingOutputDir(), imageFileNmae);
}
