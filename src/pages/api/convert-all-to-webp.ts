// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import IConvertAllApiResult from "@/types/i-convert-all-result";
import { convertRecursivelyToWebP } from "@/utils/server/sharp-helper-utils";
import { getImagesDirInPublic } from "@/utils/server/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IConvertAllApiResult>
) {
  const sourceRootDirectory = getImagesDirInPublic();
  const targetRootDirectory = getImagesDirInPublic();

  const convertRecursivelyToWebPResult = await convertRecursivelyToWebP(
    sourceRootDirectory,
    targetRootDirectory
  );

  res.send({
    targetRootDirectory,
    sourceRootDirectory,
    convertRecursivelyToWebPResult,
  });
}
