import Link from "next/link";
import { FC } from "react";
import styles from "@/styles/top.module.css";

interface IItem {
  display: string;
  url: string;
}
const tabs: IItem[] = [
  { url: "/", display: "ConvertAllToWebP" },
  { url: "/convert-one-to-webp", display: "ConvertOneToWebP" },
  { url: "/scale-one", display: "ScaleOne" },
];

const top: FC = () => {
  const elems = tabs.map((it,i) => <Link key={i} href={it.url}>{it.display}</Link>);
  return <div className={styles.container}>{elems}</div>;
};

export default top;
