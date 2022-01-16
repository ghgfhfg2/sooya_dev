import Head from "next/head";
import Image from "next/image";
import List from "@component/List";
import style from "styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>title</title>
      </Head>
      <List />
    </div>
  );
}
