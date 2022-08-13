import React, { useEffect, useState } from "react";
import { Card, Button, Form, Input, Row, Col } from "antd";

import * as yup from "yup";

import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  KeyOutlined,
} from "@ant-design/icons";

import isEmpty from "lodash.isempty";

function From(props) {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const userSchema = yup.object().shape({
    name: yup
      .string()
      .required("Required!")
      .min(2, "Mininum 2 characters")
      .max(15, "Maximum 15 characters"),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
    email: yup.string().required("Required!").email("Invalid email format"),
  });

  const [user, setUser] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (!props.setSelectedUser) return;
    if (props.setSelectedUser.id === user.id) return;
    setUser(props.setSelectedUser);
  }, [props.setSelectedUser]);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleAddUser = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    if (props.setSelectedUser) {
      props.setUpdate(user);
    } else {
      props.creatUser({ ...user, id: Math.floor(Math.random() * 100 + 1) });
    }
    resetForm();
  };
  async function validateForm() {
    const validationErrors = {};
    try {
      await userSchema.validate(user, {
        abortEarly: false,
      });
    } catch (err) {
      const errObj = { ...err };

      errObj.inner.forEach((validationError) => {
        if (validationErrors[validationError.path]) return;
        validationErrors[validationError.path] = validationError.message;
      });

      setErrors(validationErrors);
    }

    return isEmpty(validationErrors);
  }
  const resetForm = () => {
    setUser({
      id: "",
      name: "",
      phone: "",
      email: "",
    });
    setErrors({});
  };

  return (
    <Card
      title="Thông tin sinh viên"
      headStyle={{
        fontSize: "20px",
        backgroundColor: "#000",
        color: "#fff",
        margin: "0",
      }}
    >
      <Form onFinish={handleAddUser}>
        <Row gutter={20}>
          {/* <Col span={12}>
            <Form.Item label="Mã Sv">
              <Input
                disabled
                value={}
                name="id"
                prefix={<KeyOutlined />}
              />
            </Form.Item>
          </Col> */}
          <Col span={8}>
            <Form.Item label="Name">
              <Input
                value={user.name}
                name="name"
                onChange={handleChange}
                prefix={<UserOutlined />}
              />
              <span>{errors.name}</span>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Phone">
              <Input
                value={user.phone}
                name="phone"
                onChange={handleChange}
                prefix={<PhoneOutlined />}
              />
              <span>{errors.phone}</span>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Email">
              <Input
                value={user.email}
                name="email"
                onChange={handleChange}
                prefix={<MailOutlined />}
              />
              <span>{errors.email}</span>
            </Form.Item>
          </Col>
        </Row>
        <Button
         
          htmlType="submit"
          ghost
          style={{ backgroundColor: "#73d13d", color: "#fff" ,marginRight:'10px' }}
        >
          Thêm/Sửa Sinh Viên
        </Button>
        <Button
          htmlType="reset"
          onClick={resetForm}
          ghost
          style={{ backgroundColor: "#000", color: "#fff" }}
        >
          Làm Mới
        </Button>
      </Form>
    </Card>
  );
}

export default From;
