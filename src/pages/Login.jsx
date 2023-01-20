import React from "react";
import { Button, Form, Input } from "antd";
import { useLogin } from "../services/AuthService.js";
import {useTranslation} from "react-i18next";

const Login = () => {
    const { mutate: login } = useLogin();

    const {t} = useTranslation()

    const onFinish = (values) => {
        login(values);
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
            autoComplete="off"
        >
            <Form.Item
                label={t("common.email")}
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={t("common.password")}
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    {t('button.login')}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
