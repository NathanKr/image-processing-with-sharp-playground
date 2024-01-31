import path from "path";
import { IMAGES_DIR } from "../constants";

export function getImagePathInPublicDir(imageFileNmae : string) : string{
    return path.join(process.cwd(), 'public',IMAGES_DIR,imageFileNmae);
}