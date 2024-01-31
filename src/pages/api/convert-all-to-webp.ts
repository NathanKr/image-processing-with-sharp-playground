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

  await convertRecursivelyToWebP(sourceRootDirectory, targetRootDirectory);

  res.send({ targetRootDirectory, sourceRootDirectory });
}
