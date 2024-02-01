import Link from "next/link";
import { FC } from "react";
import styles from "@/styles/top.module.css";

interface IItem {
  display: string;
  url: string;
}
const tabs: IItem[] = [
  { url: "/", display: "ConvertAll" },
  { url: "/convert-to-webp", display: "Convert" },
  { url: "/scale", display: "Scale" },
];

const top: FC = () => {
  const elems = tabs.map((it) => <Link href={it.url}>{it.display}</Link>);
  return <div className={styles.container}>{elems}</div>;
};

export default top;
