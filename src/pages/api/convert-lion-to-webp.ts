// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  LION_1280W,
  WEBP_EXTENSION,
} from "@/utils/constants";
import { removeFileExtension } from "@/utils/server/gen-file-utils";
import {
  getImagePathInLionsDir,
  getImagePathInOutputDir,
} from "@/utils/server/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fileName = `${LION_1280W}.jpg`;
  const sourceImageFilePath = getImagePathInLionsDir(fileName);
  const fileNameWIthoutExtension = removeFileExtension(fileName);
  const outputImagePath = getImagePathInOutputDir(
    `${fileNameWIthoutExtension}.${WEBP_EXTENSION}`
  );
  await sharp(sourceImageFilePath).webp().toFile(outputImagePath);

  res.status(200).json({ outputImagePath });
}
