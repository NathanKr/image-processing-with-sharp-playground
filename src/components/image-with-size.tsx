import axios from "axios";
import { IMAGES_DIR } from "@/utils/constants";
import { FC, useEffect, useState } from "react";
import { IReqFileSize } from "@/types/i-req-file-size";
import { IResFileSize } from "@/types/i-res-file-size";

interface IProps {
  filePathRelative: string; // under public/images
}

const ImageWithSize: FC<IProps> = ({ filePathRelative }) => {
  const [fileSizeKb, setFileSizeKb] = useState<number>();
  useEffect(getFileSizeKb, []);

  function getFileSizeKb() {
    const url = "/api/file-size";
    const params: IReqFileSize = {
      filePathRelative,
    };
    axios
      .get(url, { params })
      .then(function (response) {
        const data = response.data as IResFileSize;
        setFileSizeKb(parseInt(`${data.fileSizeKb}`));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>
        {filePathRelative} [{fileSizeKb} kb]
      </p>
      <img
        src={`${IMAGES_DIR}/${filePathRelative}`}
        alt={`${filePathRelative} is missing`}
      />
    </div>
  );
};

export default ImageWithSize;
