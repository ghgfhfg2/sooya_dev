import React from "react";
import { Button } from "antd";
import * as antIcon from "react-icons/ai";
import style from "styles/nav.module.css";
import { useSelector } from "react-redux";

function TotalMenu({ visible, onCloseMenu }) {
  const userInfo = useSelector((state) => state.user.currentUser);
  console.log(userInfo);
  return (
    <>
      <nav
        className={
          visible ? `${style[`nav-box`]} ${style.on}` : `${style[`nav-box`]}`
        }
      >
        {userInfo && userInfo.displayName}
        <button
          type="button"
          className={style[`btn-close`]}
          onClick={onCloseMenu}
        >
          <antIcon.AiOutlineClose />
        </button>
        <ul className={style.nav}>
          <li>aa</li>
        </ul>
      </nav>
      <div
        onClick={onCloseMenu}
        className={visible ? `${style.bg} ${style.on}` : `${style.bg}`}
      ></div>
    </>
  );
}

export default TotalMenu;
