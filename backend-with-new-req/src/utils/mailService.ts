import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import { logger } from './logger';

dotenv.config();

export const sendEmail = async (email: string, subject: string, text: string) =>{
    try{
    const tranporter: any = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        service: process.env.MAIL_SERVICE,
        port: Number(process.env.MAIL_PORT) || 0,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        },
    });
    await tranporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: subject,
        text: text
    });
    logger.info("Email sent successfully");
}catch(error){
    logger.error("Email not sent", error)
}
};//end of send mail