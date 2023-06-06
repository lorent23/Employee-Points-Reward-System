import React, { useEffect } from "react";
import { Alert, Form } from "antd";
import { Link } from "react-router-dom";
import { useVerifyEmail } from "../../services/AuthService";
import { useTranslation } from "react-i18next";

const VerifyEmail = () => {
  const { mutate: verifyemail} = useVerifyEmail();


  const { t } = useTranslation();


  const onFinish = (values) => {
    verifyemail(values);
  };

  useEffect(() => {
    verifyemail();
  }, []);

  return (
    <div>
      <Alert
        onFinish={onFinish}
        message="Email Verified Successfully"
        type="success"
        showIcon="showIcon"
      />  
       <Form.Item 
              wrapperCol={{
                offset: 8,
                span: 16,
            }}>
            <Link to="/login">Go To Login</Link>
            </Form.Item>   
    </div>
  );
};

export default VerifyEmail;