import React, { useEffect } from "react";
import {Button, Drawer, Form, Input, Space, Select} from "antd";
import {
    useCreateUser,
    useUpdateUser,
  } from "../../services/UserService.js";
import {useTranslation} from "react-i18next";
import {DRAWER_ACTIONS} from "../../utilities/constants.js";

const AddUser = ({details, openType, onClose: closeModal}) => {
    const { mutate: createUser } = useCreateUser();
    const { mutate: updateUser } = useUpdateUser();
    const [form] = Form.useForm();

    const options = [
        { value: '1', label: 'admin' },
        { value: '2', label: 'user' },
      ]

   

    const {t} = useTranslation();
    

    const onClose = (action = DRAWER_ACTIONS.CANCEL) => {
        form.resetFields();
        closeModal(action);
    };

    const onFinish = (values) => {
        if (openType === DRAWER_ACTIONS.CREATE) {
            createUser(values, {
                onSuccess: () => {
                    onClose(DRAWER_ACTIONS.CREATE);
                }
            });
        } else {
            updateUser({
                ...values,
                id: details.id
            }, {
                onSuccess: () => {
                    onClose(DRAWER_ACTIONS.UPDATE);
                }
            });
        }
    };

    useEffect(() => {
        form.setFieldsValue(details);
      }, [details]);
    
      const onSubmit = () => {
        form.submit();
      };

    return (
        <Drawer
            title={openType === DRAWER_ACTIONS.CREATE
                ? "Add User"
                : "Edit User"
}
            onClose={onClose}
            open={openType}
            width={400}
            bodyStyle={{
                paddingBottom: 80
            }}
            extra={
            <Space > 
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} type="primary">
                Submit
            </Button>
           </Space>}>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8
                }}
                wrapperCol={{
                    span: 16
                }}
                initialValues={{
                    remember: true
                }}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item
                    label={t("common.firstName")}
                    name="firstName"
                    rules={[{
                            required: true,
                            message: "Please input name!"
                        }
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={t("common.lastName")}
                    name="lastName"
                    rules={[{
                            required: true,
                            message: "Please input surname!"
                        }
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={t("common.email")}
                    name="email"
                    rules={[{
                            required: true,
                            message: "Please input email!"
                        }
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={t("common.role")}
                    name="roleId"
                    type="number"
                    rules={[{
                            required: true
                        }
                    ]}>
                     <Select name="roleId" id="roleId" type="number" options={options} />
                </Form.Item>

                <Form.Item
                    label={t("common.password")}
                    name="password"
                    rules={[{
                            required: true,
                            message: "Please input your password!"
                        }
                    ]}>
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16
                    }}>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default AddUser;