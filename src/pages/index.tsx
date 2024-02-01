import ImageWithSize from "@/components/image-with-size";
import InternalApi from "@/types/e-internal-api";
import {
  KITES_DIR,
  KITE_1002W,
  LIONS_DIR,
  LION_1024W_WEBP,
  LION_1280W,
  WEBP_EXTENSION,
} from "@/utils/constants";
import axios from "axios";

export default function ConvertAllToWebp() {

  async function convertAllToWebp(): Promise<void> {
    const url = InternalApi.ConvertAllToWebp;
    await axios.get(url);
    window.location.reload();
  }

  return (
    <div>
      <h2>Original jpg files</h2>
      <div style={{ display: "flex" }}>
        <ImageWithSize filePathRelative={`${LIONS_DIR}/${LION_1280W}.jpg`} />
        <ImageWithSize filePathRelative={`${KITES_DIR}/${KITE_1002W}.jpg`} />
      </div>

      <h2>Converted jpg files to webp</h2>
      <button onClick={convertAllToWebp}>Click to convert to webp if images are missing</button>
      <p style={{color:'green'}}>Notice the size of webp file below is much smaller than jpg above</p>
      <p style={{color:'green'}}>Notice the quality of the jpg and webp which seems the same</p>
      <div style={{ display: "flex" }}>
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
