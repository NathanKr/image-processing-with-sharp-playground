import InternalApi from "@/types/e-internal-api";
import { IReqFile } from "@/types/i-req-file";
import IResConvert from "@/types/i-res-convert";
import { KITES_DIR, KITE_1002W } from "@/utils/constants";
import axios from "axios";
import { FC, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";

const ConvertToWebp: FC = () => {
  const [data, setData] = useState<IResConvert>();
  const inputElement = useRef<HTMLInputElement>(null);
  async function clickHandler() {
    const url = InternalApi.ConvertToWebp;
    setData({ sourceImageFullPath: "", targetImageFullPath: "" });

    const body: IReqFile = {
      filePathRelative: inputElement.current?.value ?? "",
    };
    try {
      setData((await axios.post(url, body)).data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <label>Image file under images directory</label>
      <input
        ref={inputElement}
        defaultValue={`${KITES_DIR}/${KITE_1002W}.jpg`}
      />
      <br />
      <Button variant='contained' onClick={clickHandler}>
        Convert to webp
      </Button>
      <p>source full path : {data?.sourceImageFullPath} </p>
      <p>target full path : {data?.targetImageFullPath} </p>
    </>
  );
};
export default ConvertToWebp;
