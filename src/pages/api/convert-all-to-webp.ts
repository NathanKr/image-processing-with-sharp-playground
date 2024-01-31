// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { convertRecursivelyToWebP } from "@/utils/server/sharp-helper-utils";
import { getImagesDirInPublic } from "@/utils/server/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sourceRootDirectory = getImagesDirInPublic();
  const targetRootDirectory = getImagesDirInPublic();

  convertRecursivelyToWebP(sourceRootDirectory, targetRootDirectory);

  res.status(200).json({ targetRootDirectory, sourceRootDirectory });
}
