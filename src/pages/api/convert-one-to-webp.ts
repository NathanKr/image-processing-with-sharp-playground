// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { IReqFile } from "@/types/i-req-file";
import { getImageFullPathInImagesDir } from "@/utils/server/utils";
import { existsSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import StatusCodes from "http-status-codes";
import { replaceFileExtension } from "@/utils/server/gen-file-utils";
import { WEBP_EXTENSION } from "@/utils/constants";
import sharp from "sharp";
import IResConvert from "@/types/i-res-convert";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResConvert>
) {
  const imagefileUnderPublicImages = req.body as unknown as IReqFile;
  const sourceImageFullPath = getImageFullPathInImagesDir(
    imagefileUnderPublicImages
  );

  if (!existsSync(sourceImageFullPath))
    return res.status(StatusCodes.NOT_FOUND).end();

  const targetImageFullPath = replaceFileExtension(
    sourceImageFullPath,
    WEBP_EXTENSION
  );
  await sharp(sourceImageFullPath).webp().toFile(targetImageFullPath);

  res
    .status(StatusCodes.CREATED)
    .send({ sourceImageFullPath, targetImageFullPath });
}
