import React, { useState } from "react";
import Link from "next/link";
import * as antIcon from "react-icons/ai";
import style from "styles/header.module.css";
import TotalMenu from "@component/TotalMenu";

function Top() {
  const [visible, setVisible] = useState(false);
  const onLeftMenu = () => {
    setVisible(true);
  };
  const onCloseMenu = () => {
    console.log(1);
    setVisible(false);
  };
  return (
    <>
      <header className={style.header}>
        <button
          type="button"
          className={style[`btn-menu`]}
          onClick={onLeftMenu}
        >
          <antIcon.AiOutlineMenu className={style.ic} />
        </button>
        <Link href="/">
          <a>home</a>
        </Link>
      </header>
      <TotalMenu visible={visible} onCloseMenu={onCloseMenu} />
    </>
  );
}

export default Top;
