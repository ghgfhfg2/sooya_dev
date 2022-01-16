import React, { useEffect } from "react";
import style from "styles/list.module.css";
import { db } from "src/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function List() {
  const getDb = getDocs(collection(db, "test"));
  const write = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  useEffect(() => {
    return;
    getDb.then((el) => {
      el.docs.forEach((el) => {
        console.log(el.data());
      });
    });
  }, []);
  return (
    <>
      <ul className={style.list}>
        <li>ada</li>
        <li>ada</li>
        <li>ada</li>
      </ul>
    </>
  );
}

export default List;
