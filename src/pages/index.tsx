import { IMAGES_DIR, LION_1024W_WEBP } from "@/utils/constants";

export default function Home() {
  return (
    <>
      <img src={`${IMAGES_DIR}/${LION_1024W_WEBP}`} />
    </>
  );
}
