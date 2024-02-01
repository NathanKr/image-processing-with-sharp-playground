import { IImageFile } from "./i-image-file";

export interface IScaleImageFile extends IImageFile {
  scaleFactor: number; // 2,3,4 ..
}
