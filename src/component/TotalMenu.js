import React from "react";
import { Button } from "antd";
import * as antIcon from "react-icons/ai";
import style from "styles/nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { auth } from "src/firebase";
import { signOut } from "firebase/auth";
import { clearUser } from "@redux/actions/user_action";

function TotalMenu({ visible, onCloseMenu }) {
  const userInfo = useSelector((state) => state.user.currentUser);

  //로그아웃
  const googleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearUser());
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <nav
        className={
          visible ? `${style[`nav-box`]} ${style.on}` : `${style[`nav-box`]}`
        }
      >
        {userInfo ? (
          <>
            <span>{userInfo.displayName}</span>
            <button type="button" onClick={googleSignOut}>
              logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <a>login</a>
            </Link>
          </>
        )}
        <button
          type="button"
          className={style[`btn-close`]}
          onClick={onCloseMenu}
        >
          <antIcon.AiOutlineClose />
        </button>
        <ul className={style.nav}>
          <li>
            <Link href="/regist">
              <a>등록</a>
            </Link>
          </li>
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
