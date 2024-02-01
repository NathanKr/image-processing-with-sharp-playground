import InternalApi from "@/types/e-internal-api";
import { IImageFile } from "@/types/i-image-file";
import IMageFileOperationResult from "@/types/i-image-file-operation-result";
import { IScaleImageFile } from "@/types/i-scale-image-file";
import { KITES_DIR, KITE_1002W } from "@/utils/constants";
import { Button } from "@mui/material";
import axios from "axios";
import { FC, useRef, useState } from "react";

const ScaleOneImageFile: FC = () => {
  const [data, setData] = useState<IMageFileOperationResult>();
  const inputElemFilePathRelative = useRef<HTMLInputElement>(null);
  const inputElemScaleFactor = useRef<HTMLInputElement>(null);
  async function clickHandler() {
    const url = InternalApi.ScaleOne;
    setData({ sourceImageFullPath: "", targetImageFullPath: "" });

    const body: IScaleImageFile = {
        filePathRelative: inputElemFilePathRelative.current?.value ?? "",
        scaleFactor: Number(inputElemScaleFactor.current?.value)
    };
    try {
      setData((await axios.post(url, body)).data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <label>Insert relative image path under images directory</label>
      <br />
      <input
        ref={inputElemFilePathRelative}
        defaultValue={`${KITES_DIR}/${KITE_1002W}.jpg`}
      />
      <br /> <br />
      <label>Insert scale factor &gt; 1</label>
      <br />
      <input ref={inputElemScaleFactor} type="number" defaultValue="2" />
      <br />
      <br />
      <Button variant="contained" onClick={clickHandler}>
        Scale
      </Button>
      <br />
      <br />
      <p>source full path : {data?.sourceImageFullPath} </p>
      <p>target full path : {data?.targetImageFullPath} </p>
    </>
  );
};
export default ScaleOneImageFile;
