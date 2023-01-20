import React, { useEffect } from 'react';
import { Alert } from "antd";
import { VerifyAccount } from "../../services/AuthService.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const VerifyEmail = () => {

  return (
    <div>
   <Alert message="Email Verified Successfully" type="success" showIcon />
   </div>
);
}

export default VerifyEmail;

