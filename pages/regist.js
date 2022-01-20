import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { db } from "src/firebase";
import { collection, doc, setDoc, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-uuid";

function regist() {
  //이미지 업로드 처리
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const [uploadImg, setuploadImg] = useState();
  const onImgUpload = (e) => {
    setuploadImg(e.file);
  };

  const onFinish = async (values) => {
    const uid = uuid();
    let thumb_url = "";
    if (typeof values.thumb_img !== "undefined") {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `portfolio/thumb/${uid}/${uploadImg.originFileObj.name}`
      );
      const snapshot = await uploadBytes(storageRef, uploadImg.originFileObj);
      thumb_url = await getDownloadURL(snapshot.ref);
    }
    try {
      values.thumb_img = thumb_url;
      setDoc(doc(db, "portfolio", values.title), {
        ...values,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="제목"
          name="title"
          rules={[{ required: true, message: "title은 필수입니다." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="주소"
          name="url"
          rules={[{ required: true, message: "url은 필수입니다." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="썸네일"
          name="thumb_img"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload listType="picture" onChange={onImgUpload}>
            <Button>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}

export default regist;
