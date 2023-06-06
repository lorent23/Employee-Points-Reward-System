import React,{useEffect} from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { useUpdateRate} from "../../services/ExchangeService.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ExchangeRate = ({details}) => {
  const { mutate: updaterate, isSuccess } = useUpdateRate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [form] = Form.useForm();

  const { t } = useTranslation();

  if (isSuccess) {
    navigate(from, { replace: true });
  }

  const onFinish = (values) => {
    updaterate(values);
  };

  useEffect(() => {
    form.setFieldsValue(details);
  }, [details]);


  return (
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
        label={t("common.exhangeRate")}
        name="exchangeRate"
        id="exchangeRate"
        type="number"
        rules={[
          {
            required: true,
            message: "Please add an exchange rate!",
          },
        ]}
      >
        <InputNumber id="exchangeRate" name="exchangeRate" type="number" />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {t("button.submit")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ExchangeRate;

