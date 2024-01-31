import ImageWithSize from "@/components/image-with-size";
import {
  KITES_DIR,
  KITE_1002W,
  LIONS_DIR,
  LION_1024W_WEBP,
  LION_1280W,
  WEBP_EXTENSION,
} from "@/utils/constants";
import axios from "axios";

export default function Home() {

  async function convertToWebp(): Promise<void> {
    const url = "/api/convert-all-to-webp";
    await axios.get(url);
    window.location.reload();
  }

  return (
    <div>
      <h2>Original</h2>
      <div style={{ display: "flex" }}>
        <ImageWithSize filePathRelative={`${LIONS_DIR}/${LION_1280W}.jpg`} />
        <ImageWithSize filePathRelative={`${KITES_DIR}/${KITE_1002W}.jpg`} />
        <ImageWithSize filePathRelative={`${LION_1024W_WEBP}`} />
      </div>

      <h2>Converted to webp</h2>
      <button onClick={convertToWebp}>Click to convert to webp if images are missing</button>
      <p style={{color:'orange'}}>Notice the size of webp file below is much smaller than jpg above</p>
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
