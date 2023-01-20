import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Space } from "antd";
import { useTranslation } from "react-i18next";
import {
  useCreateCompany,
  useUpdateCompany,
} from "../../services/CompaniesService.js";
import { DRAWER_ACTIONS } from "../../utilities/constants.js";

const CompanyForm = ({ details, openType, onClose: closeModal }) => {
  const { mutate: createCompany } = useCreateCompany();
  const { mutate: updateCompany } = useUpdateCompany();
  const [form] = Form.useForm();

  const { t } = useTranslation();

  const onClose = (action = DRAWER_ACTIONS.CANCEL) => {
    form.resetFields();
    closeModal(action);
  };

  const onFinish = (values) => {
    if (openType === DRAWER_ACTIONS.CREATE) {
      createCompany(values, {
        onSuccess: () => {
          onClose(DRAWER_ACTIONS.CREATE);
        },
      });
    } else {
      updateCompany(
        { ...values, id: details.id },
        {
          onSuccess: () => {
            onClose(DRAWER_ACTIONS.UPDATE);
          },
        }
      );
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
      title={
        openType === DRAWER_ACTIONS.CREATE ? "Create Company" : "Edit Company"
      }
      onClose={onClose}
      open={openType}
      width={400}
      bodyStyle={{
        paddingBottom: 80,
      }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={t("common.name")}
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("common.description")}
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CompanyForm;
