// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import StatusCodes from "http-status-codes";
import IScaleFactor from "@/types/i-scale-factor";
import IConvertAllApiResult from "@/types/i-convert-all-result";
import { sacleWebPImagesFilesRecursively } from "@/utils/server/sharp-helper-utils";
import { getImagesDirInPublic } from "@/utils/server/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IConvertAllApiResult>
) {
  const { scaleFactor } = req.body as IScaleFactor;

  const targetRootDirectory = getImagesDirInPublic();
  const sourceRootDirectory = getImagesDirInPublic();

  console.log(targetRootDirectory,sourceRootDirectory,scaleFactor);
  

  const convertResult = await sacleWebPImagesFilesRecursively(
    sourceRootDirectory,
    scaleFactor
  );

  res.status(StatusCodes.CREATED).send({
    targetRootDirectory,
    sourceRootDirectory,
    convertResult,
  });
}
