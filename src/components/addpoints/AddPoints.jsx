import React, { useEffect} from "react";
import {Button, Drawer, Form, Input, Space, Select, Radio} from "antd";
import {
    useAddPoints,
  } from "../../services/PointsService.js";
import {useTranslation} from "react-i18next";
import {DRAWER_ACTIONS} from "../../utilities/constants.js";

const AddPoints = ({details, openType, onClose: closeModal}) => {
    const { mutate: addPoints } = useAddPoints();
    const queryParams = new URLSearchParams(window.location.search)
    const paramsid = queryParams.get("id")
    const [form] = Form.useForm();
    const options = [
        { value: 'Add Points', label: 'Add Points' },
        { value: 'Remove Points', label: 'Remove Points' },
      ]

    const {t} = useTranslation();
    

    const onClose = (action = DRAWER_ACTIONS.CANCEL) => {
        form.resetFields();
        closeModal(action);
    };

    const onFinish = (values) => {
        if (openType === DRAWER_ACTIONS.CREATE) {
            addPoints(values, {
                onSuccess: () => {
                    onClose(DRAWER_ACTIONS.CREATE);
                }
                
            });
    }};

    useEffect(() => {
        form.setFieldsValue(details);
      }, [details]);
    
      const onSubmit = () => {
        form.submit();
      };
      

    return (
        <Drawer
            title={openType === DRAWER_ACTIONS.CREATE
                ? "Add Points"
                : "Edit Points"
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
                label={t("common.id")}
                name="id"
                rules={[{
                        required: true,
                        message: "Please input id!"
                    }
                ]}>
                     <Select defaultValue="Select User ID" loading>
                        <Option value={paramsid}/>
                        </Select>
                    
                </Form.Item>

                <Form.Item
                    label={t("common.points")}
                    name="numberOfPoints"
                    rules={[{
                            required: true,
                            message: "Please input number of points!"
                        }
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={t("common.pointsType")}
                    name="pointsType"
                    type="number"
                    rules={[{
                            required: true
                        }
                    ]}>
                     <Select name="pointsType" id="pointsType" type="number" options={options} />
                </Form.Item>
                
                <Form.Item
                    label={t("common.description")}
                    name="description"
                    rules={[{
                            required: true,
                            message: "Please input description!"
                        }
                    ]}>
                    <Input/>
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

export default AddPoints;