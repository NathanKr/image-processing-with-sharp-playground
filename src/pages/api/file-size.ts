// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IReqFile } from "@/types/i-req-file";
import { IResFileSize } from "@/types/i-res-file-size";
import { getFileSizeKb } from "@/utils/server/gen-file-utils";
import { getImageFullPathInImagesDir} from "@/utils/server/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResFileSize>
) {
  const file = req.query as unknown as IReqFile;

  const fullPath = getImageFullPathInImagesDir(file)
  const responseInfo: IResFileSize = {
    fileSizeKb: getFileSizeKb(fullPath),
  };

  res.send(responseInfo);
}
