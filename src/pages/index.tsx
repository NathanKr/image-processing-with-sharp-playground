import ImageWithSize from "@/components/image-with-size";
import InternalApi from "@/types/e-internal-api";
import IConvertAllApiResult from "@/types/i-convert-all-result";
import {
  KITES_DIR,
  KITE_1002W,
  LIONS_DIR,
  LION_1280W,
  WEBP_EXTENSION,
} from "@/utils/constants";
import { Alert, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ConvertAllToWebp() {
  const [data, setData] = useState<IConvertAllApiResult>();
  const [loading,setLoading] = useState(false)

  async function convertAllToWebp(): Promise<void> {
    const url = InternalApi.ConvertAllToWebp;
    setLoading(true);
    const {data} = await axios.get(url);
    setLoading(false);
    setData(data)
  }

  return (
    <div>
      <Alert severity="success">
        Notice the size of webp file below is much smaller than jpg above
      </Alert>
      <Alert severity="success">
        Notice the quality of the jpg and webp files which seems the same
      </Alert>

      <h2>Original jpg files</h2>
      <div style={{ display: "flex" }}>
        <ImageWithSize filePathRelative={`${LIONS_DIR}/${LION_1280W}.jpg`} />
        <ImageWithSize filePathRelative={`${KITES_DIR}/${KITE_1002W}.jpg`} />
      </div>

      <h2>Converted jpg files to webp</h2>
      <Button variant="contained" onClick={convertAllToWebp}>
        Click to convert to webp if images are missing
      </Button>
      {loading && <p>loading ...</p>}
      <div>
        <p>sourceRootDirectory : {data?.sourceRootDirectory}</p>
        <p>targetRootDirectory : {data?.targetRootDirectory}</p>
        <p>errors : {data?.convertRecursivelyToWebPResult.errorFiles.length}</p>
      </div>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <ImageWithSize
          filePathRelative={`${LIONS_DIR}/${LION_1280W}.${WEBP_EXTENSION}`}
        />
        <ImageWithSize
          filePathRelative={`${KITES_DIR}/${KITE_1002W}.${WEBP_EXTENSION}`}
        />
      </div>
    </div>
  );
}
