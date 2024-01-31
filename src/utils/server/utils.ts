import path from "path";
import { IMAGES_DIR, LIONS_DIR, OUTPUT_DIR } from "../constants";

// export function getImagePathInPublicDir(imageFileNmae: string): string {
//   return path.join(process.cwd(), "public", IMAGES_DIR, imageFileNmae);
// }

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

export function getImagePathInOutputDir(imageFileNmae: string): string {
  return path.join(process.cwd(), OUTPUT_DIR, imageFileNmae);
}
