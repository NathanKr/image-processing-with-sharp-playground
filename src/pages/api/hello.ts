// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { LION_1024W_WEBP } from "@/utils/constants";
import { getImagePathInPublicDir } from "@/utils/server/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import sharp from 'sharp'

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const imageFullPath = getImagePathInPublicDir(LION_1024W_WEBP);
  const metadata = await sharp(imageFullPath).metadata();
  console.log(metadata);
  
  res.status(200).json({ name:  imageFullPath});
}
