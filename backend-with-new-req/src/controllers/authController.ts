import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as crypto from "crypto";
import dotenv from "dotenv";
import Joi from "joi";
import {logger} from "../utils/logger";
import { successResponse, schemaFailResponse } from "../utils/formatResponse";
import { Request, Response } from "express";
import { UserModel, AccessTokenModel } from "../models";
import { sendEmail } from "../utils/mailService";

dotenv.config();

const secretKey: any = process.env.JWT_SECRET

class AuthController{
    async login(req: Request, res: Response){
        try{
            const {email, password} = req.body;

            //Find a user by email
            const user: any = await UserModel.findOne({where: {email}})

            //email not found
            if(!user){
                return res.status(401).send({message: "Email is not found"})
            }

            //if email is found checking the password if it is the same
            const comparePassword = await bcrypt.compare(password, user.password);
            //Password does not match
            if(!comparePassword){
                return res.status(401).send({message: "Password does not match"})
            }

            if(!user.isVerified){
                return res.status(401).send({message: "Email has not been verified"})
            }

            let token = jwt.sign({user}, secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            const data = {
                user, 
                token
            }

            return successResponse(req, res, data, 200)
        }catch(error){
            logger.error("Failed to login", error);
            return res.json({msg: "Server error", error, status: 500})
        }
    }//End of login

    async verifyEmail(req: Request, res: Response){
        try{
            const user: any = await UserModel.findByPk(req.params.userId);
            if(!user) return res.status(400).send({message: "User not found"});

            const token: any = await AccessTokenModel.findOne({where: {userId: user.id, token: req.params.token}})
            if(!token) return res.status(400).send({message: "Invalid link or expired"})
            
            user.isVerified = true;
            await user.save();
            await token.destroy();

            return successResponse( req, res, "Email verified successfully", 200)
        }catch(error){
            logger.error("Failed to verify the email", error);
            return res.status(400).send({message: "Failed to verify the email"});
        }
    }//End of verify email

    async generateResetPassword(req: Request, res: Response){
        try{
            const schema = Joi.object({email: Joi.string().email().required()});
            
            const {error} = schema.validate(req.body);
            if(error) return res.status(400).send(error.details[0].message);

            const user: any = await UserModel.findOne({where: {email: req.body.email}})
            if(!user) return res.status(400).send({message: "user with the given email doesn't exist"});

            const token: any = await AccessTokenModel.findOrCreate({ where: {userId: user.id, token: crypto.randomBytes(32).toString('hex')}})
            
            const link = `${process.env.DOMAIN_URL}/api/auth/reset-password/${user.id}/${token[0].token}`;
            sendEmail(user.email, "Platforma e pikeve ndryshoni passwordin", link);

            return successResponse(req, res, 'Password link send via mail', 200)
        }
        catch(error){
            logger.error(error);
            return res.status(400).send("An error occured")
        }
    }// End of generate Password

    async resetPassword(req: Request, res: Response){
        try{
            const schema = Joi.object({password: Joi.string().required()});

            const {error} = schema.validate(req.body);
            if(error) return schemaFailResponse(req, res, error.details[0].message);

            const user: any = await UserModel.findByPk(req.params.userId);
            if(!user) return res.status(400).send("User Not found");

            const token: any = await AccessTokenModel.findOne({where: { userId: user.id, token: req.params.token}});
            if(!token) return res.status(400).send("Invalid link or expired token")

            user.password = bcrypt.hashSync(req.body.password, 10);
            await user.save();
            await token.destroy();
            return successResponse(req, res, "password reseted successfully", 200)
        }catch(error){
            logger.error("Failed to reset password");
            return res.status(400).send("Failed to reset the password")
        }
    }// end of reset password
}

export default new AuthController();