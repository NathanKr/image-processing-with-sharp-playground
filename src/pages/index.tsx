import { IMAGES_DIR, KITES_DIR, KITE_1002W, LIONS_DIR, LION_1024W_WEBP, LION_1280W, WEBP_EXTENSION } from "@/utils/constants";

export default function Home() {
  return (
    <div >
      <h2>Original</h2>
      <img src={`${IMAGES_DIR}/${LIONS_DIR}/${LION_1280W}.jpg`} />
      <img src={`${IMAGES_DIR}/${KITES_DIR}/${KITE_1002W}.jpg`} />
      <img src={`${IMAGES_DIR}/${LION_1024W_WEBP}`} />
      <h2>Converted to webp after access to /api/convert-all-to-webp</h2>
      <img src={`${IMAGES_DIR}/${LIONS_DIR}/${LION_1280W}.${WEBP_EXTENSION}`} />
      <img src={`${IMAGES_DIR}/${KITES_DIR}/${KITE_1002W}.${WEBP_EXTENSION}`} />
      
    </div>
  );
}
