import React from "react";
import { Button, Form, Input } from "antd";
import {Link} from "react-router-dom";
import { useLogin } from "../services/AuthService.js";
import {useTranslation} from "react-i18next";
import { Image } from 'antd';

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
            <Image src="/src/assets/images/logoFirst.png"
            preview={false}
            style={{ marginLeft: '80px' }} width={200} />
            
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
            }}>
            <Link to="/forgotten-password">Forgot Password</Link>
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
