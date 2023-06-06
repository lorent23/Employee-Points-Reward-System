import express from "express";
import { authController } from "../controllers";

const router = express.Router();

router.get('/verify-email/:userId/:token', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/reset-password/:userId/:token', authController.resetPassword);
router.post('/reset-password', authController.generateResetPassword);

export default router;