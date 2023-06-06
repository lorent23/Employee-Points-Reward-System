import { dynamicFilter } from "../utils";
import bcrypt from "bcrypt";
import * as crypto from "crypto";
import Joi from "joi";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { successResponse, schemaFailResponse } from "../utils/formatResponse";
import { UserModel, RoleModel, AccessTokenModel } from "../models";
import { sendEmail } from "../utils/mailService";
import {logger} from "../utils/logger";
import { getPagination, paginate } from "../utils";


dotenv.config();

class UserController{
    async create(req: Request, res: Response){
        try{
            const schema = Joi.object({
				email: Joi.string().email().required(),
				password: Joi.string().min(6).required(),
				roleId: Joi.number().required(),
				firstName: Joi.string().required(),
				lastName: Joi.string().required(),
				isVerified: Joi.boolean().default(false),
			});
			const { error } = schema.validate(req.body);
			if (error) return schemaFailResponse(req, res, error.details[0].message)
			const { email } = req.body;
			const record: any = await UserModel.create({ ...req.body, password: bcrypt.hashSync(req.body.password, 10), isActive: false });
            const {password} = req.body
			const token: any = await AccessTokenModel.create({ token: crypto.randomBytes(32).toString('hex'), userId: record.id });
           // console.log(token)
            sendEmail(email, 'Mire se vini ne platformen e pikeve', `Mire se vini ne platformen tone te pikeve passwordi juaj eshte: ${password}, per te verifikuar emailin ju lutem klikoni linkun: ${process.env.DOMAIN_URL}/api/auth/verify-email/${record.id}/${token.token}`);
            return successResponse(req, res, record, 201, 'user_created')
        }catch(error){
            logger.error(error)
            return res.json({message: error, status: 400})
        }
    }//End of add user

    async readById(req: Request, res: Response){
        try{
            const schema = Joi.object({
                id:Joi.number().required()
            });

            const {error} = schema.validate(req.params);
            if(error) return schemaFailResponse(req, res, error.details[0].message);
            const {id} = req.params;

            const record = await UserModel.findOne({where: {id}, include: { model: RoleModel, as: 'role' }})
            return res.json({ data: record });
         }catch(error){
            logger.error("Failed to read the user", error);
            return res.json({message: "Failed to read user", error, status: 400})
        }
    }// End of read single user

    async readAll(req: Request, res: Response) {
		try {
			const { page, orderBy = 'updatedAt', direction = 'DESC' } = req.query;
			const { limit, offset } = getPagination(req.query);
			const where = dynamicFilter(req.query)
			const users = await UserModel.findAndCountAll({
				limit, offset, attributes: {
					exclude: ['password']
				},
				order: [[`${orderBy}`, `${direction}`]],
				include: [{ model: RoleModel, as: 'role' }],
			});
			const { totalItems, currentPage, data, totalPages } = paginate(users, page, limit);



			return successResponse(req, res, { data, meta: { totalItems, currentPage, totalPages } }, 200, 'users_retrieved')
		} catch (e) {
			logger.error(`Failed to read all users ${e}`, );
			return res.json({ message: `${e}`, status: 400 });
		}
	}

    async update(req: Request, res: Response){
        try{
            const {id} = req.params;
            const schema = Joi.object({
                id: Joi.number().required()
            });
            
            const {error} = schema.validate(req.params);
            if(error) return schemaFailResponse(req, res, error.details[0].message);

            const record = await UserModel.update({...req.body}, {where: {id}});
            return successResponse(req, res, record, 201, 'user-updated')
        }catch(error){
            logger.error(error)
            return res.json({message: "Failed to update the user", error})
        }
    }//End of update user

    async delete(req: Request, res: Response){
        try{
            const {id} = req.params;
            const schema = Joi.object({
                id: Joi.number().required()
            })

            const {error} = schema.validate(req.params);
            if(error) return schemaFailResponse(req, res, error.details[0].message)

            const row = await UserModel.findOne({
                where: {id}
            });

            if(row){
                await row.destroy();
                return successResponse(req, res, row, 201, "user-deleted")
            }
            else{
                return res.json({message: "User not found", status: 404})
            }
        }
        catch(error){
            logger.error(error);
            return res.json({message: "Failed to delete ", error, status: 400})
        }
    }//End of delete user

    
}
export default new UserController();