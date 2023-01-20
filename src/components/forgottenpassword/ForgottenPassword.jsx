import React from "react";
import { Button, Form, Input } from "antd";
import { ForgottenPassword } from "../../services/AuthService.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { mutate: forgotpassword, isSuccess } = ForgottenPassword();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { t } = useTranslation();

  if (isSuccess) {
    navigate(from, { replace: true });
  }

  const onFinish = (values) => {
    forgotpassword(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label={t("common.email")}
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {t("button.reset")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;

