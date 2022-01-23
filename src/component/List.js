import React, { useState, useEffect } from "react";
import style from "styles/list.module.css";
import { db } from "src/firebase";
import {
  query,
  orderBy,
  startAt,
  limit,
  collection,
  getDocs,
  addDoc,
  startAfter,
} from "firebase/firestore";
import { Spin, Button } from "antd";

function List() {
  const listRef = collection(db, "portfolio");

  const [page, setPage] = useState();
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [nextBtn, setNextBtn] = useState(true);
  const plusData = async (page) => {
    setLoading(true);
    let listArr = [];
    const q = query(listRef, orderBy("title"), startAfter(page), limit(1));
    const data = await getDocs(q);
    data.docs.forEach((list) => {
      listArr.push(list.data());
    });
    if (listArr.length) {
      setListData((state) => [...state, ...listArr]);
      const lastVisible = data.docs[data.docs.length - 1];
      setPage(lastVisible);
    } else {
      setNextBtn(false);
    }
    setLoading(false);
  };

  const getData = async (page) => {
    console.log("get data");
    let listArr = [];
    const q = query(listRef, orderBy("title"), limit(1));
    const data = await getDocs(q);
    data.docs.forEach((list) => {
      listArr.push(list.data());
    });
    setListData(listArr);
    const lastVisible = data.docs[data.docs.length - 1];
    setPage(lastVisible);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <ul className={style.list}>
        {listData &&
          listData.map((el, idx) => (
            <li key={idx}>
              <a href={el.url} target="_blank">
                <dl>
                  <dt>{el.title}</dt>
                  <dd>
                    <img src={el.thumb_img} />
                  </dd>
                </dl>
              </a>
            </li>
          ))}
      </ul>
      {(loading || listData.length == 0) && <Spin className="loading" />}
      {nextBtn && <Button onClick={() => plusData(page)}>next</Button>}
    </>
  );
}

export default List;
