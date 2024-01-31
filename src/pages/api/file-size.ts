// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IReqFileSize } from "@/types/i-req-file-size";
import { IResFileSize } from "@/types/i-res-file-size";
import { getFileSizeKb } from "@/utils/server/gen-file-utils";
import { getImagesDirInPublic } from "@/utils/server/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResFileSize>
) {
  const { filePathRelative } = req.query as unknown as IReqFileSize;
 
  const fullPath = join(getImagesDirInPublic(),filePathRelative)
  const responseInfo: IResFileSize = {
    fileSizeKb: getFileSizeKb(fullPath),
  }; 

  res.send(responseInfo);
}
