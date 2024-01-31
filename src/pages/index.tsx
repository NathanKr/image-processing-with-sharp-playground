import ImageWithSize from "@/components/image-with-size";
import {
  IMAGES_DIR,
  KITES_DIR,
  KITE_1002W,
  LIONS_DIR,
  LION_1024W_WEBP,
  LION_1280W,
  WEBP_EXTENSION,
} from "@/utils/constants";

export default function Home() {
  return (
    <div>
      <h2>Original</h2>
      <div style={{ display: "flex" }}>
        <ImageWithSize filePathRelative={`${LIONS_DIR}/${LION_1280W}.jpg`} />
        <ImageWithSize filePathRelative={`${KITES_DIR}/${KITE_1002W}.jpg`} />
        <ImageWithSize filePathRelative={`${LION_1024W_WEBP}`} />
      </div>

      <h2>Converted to webp after access to /api/convert-all-to-webp</h2>
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
