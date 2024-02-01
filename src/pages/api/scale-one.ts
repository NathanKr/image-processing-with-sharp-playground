// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getImageFullPathInImagesDir } from "@/utils/server/utils";
import { existsSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import StatusCodes from "http-status-codes";
import {
  appendScaleFactorToFileName,
} from "@/utils/server/gen-file-utils";
import sharp from "sharp";
import { IScaleImageFile } from "@/types/i-scale-image-file";
import IMageFileOperationResult from "@/types/i-image-file-operation-result";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMageFileOperationResult>
) {
  const { scaleFactor, filePathRelative } =
    req.body as unknown as IScaleImageFile;
    
  const sourceImageFullPath = getImageFullPathInImagesDir(filePathRelative);

  if (!existsSync(sourceImageFullPath))
    return res.status(StatusCodes.NOT_FOUND).end();

  const targetImageFullPath = appendScaleFactorToFileName(
    sourceImageFullPath,
    scaleFactor
  );
  // Get original image dimensions
  const { width } = await sharp(sourceImageFullPath).metadata();

  // Resize the image using sharp and await for the operation to finish
  await sharp(sourceImageFullPath)
    .resize({ width: Math.round(width! / scaleFactor) })
    .toFile(targetImageFullPath);

  res
    .status(StatusCodes.CREATED)
    .send({ sourceImageFullPath, targetImageFullPath });
}
