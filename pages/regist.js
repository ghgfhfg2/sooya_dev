import React from "react";
import { Form, Input, Button } from "antd";
import { db } from "src/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function regist() {
  const onFinish = async (values) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
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
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default regist;
