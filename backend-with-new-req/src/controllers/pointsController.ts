import { dynamicFilter } from "../utils";
import Joi from "joi";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { successResponse, schemaFailResponse } from "../utils/formatResponse";
import { PointsModel, UserModel, ExchangeRateModel } from "../models";
import {logger} from "../utils/logger";
import { getPagination, paginate } from "../utils";
import { calculateTotalPoints, calculateTotalPointsOneUser } from "../middleware/pointsCalculator";
import { where } from "sequelize";

dotenv.config();

class PointsController{
    async create(req: Request, res: Response){
        try{
            const schema = Joi.object({
                numberOfPoints: Joi.number().required(),
                description: Joi.string().required(),
				pointsType: Joi.string().required(),
                id: Joi.number().required()
            })
            
            const {error} = schema.validate(req.body);
            if(error) return schemaFailResponse(req, res, error.details[0].message);

			const exchange: any = await ExchangeRateModel.findAll({attributes: ['exchangeRate']});
            const record: any = await PointsModel.create({...req.body });
			const {numberOfPoints, id, pointsType} = req.body; 

			const user = await UserModel.findByPk(id);
			if(pointsType === "Add Points"){
			const totalPoints = Number(user?.dataValues.totalPoints) + Number(numberOfPoints);
			const value = Number(user?.dataValues.value) + (Number(numberOfPoints) * exchange[0].exchangeRate)
			
			await UserModel.update({totalPoints, value},
				{where: {id}});

			}else if(pointsType === "Remove Points"){
		
				const totalPoints = Number(user?.dataValues.totalPoints) - Number(numberOfPoints);
				const value = Number(user?.dataValues.value) - (Number(numberOfPoints) * exchange[0].exchangeRate)
				if(totalPoints < 0 ){
					const errorPoints = 0
					await UserModel.update({totalPoints: errorPoints, value: errorPoints},
						{where: {id}});
				}else{
					await UserModel.update({totalPoints, value},
						{where: {id}});
				}
			}
			else{
				return "Please choose a selection"
			}
			//console.log(exchange)


            return successResponse(req, res, record, 201, "Points-added")
        }catch(error){
            logger.error(error);
            return res.json({message: "Failed to Add Points", error, status: 400})
        }
    }

    async readAll(req: Request, res: Response){
        try {
			const { page, orderBy = 'updatedAt', direction = 'DESC' } = req.query;
			const { limit, offset } = getPagination(req.query);
			const where = dynamicFilter(req.query)
			const points = await PointsModel.findAndCountAll({
				limit, offset,
				order: [[`${orderBy}`, `${direction}`]],
			});
			const { totalItems, currentPage, data, totalPages } = paginate(points, page, limit);
			//const point = await calculateTotalPoints(data)
			return successResponse(req, res, { data, meta: { totalItems, currentPage, totalPages } }, 200, 'users_retrieved')
		} catch (e) {
			logger.error(`Failed to read all users ${e}`, );
			return res.json({ message: `${e}`, status: 400 });
		}
    }

    async getAll(req: Request, res: Response){
        try {
			const { page, orderBy = 'updatedAt', direction = 'DESC' } = req.query;
			const { limit, offset } = getPagination(req.query);
			const where = dynamicFilter(req.query)
			const users = await UserModel.findAndCountAll({
				limit, offset, attributes: {
					exclude: ['password']
				},
				order: [[`${orderBy}`, `${direction}`]],
				include: [{ model: PointsModel, as: 'points' }],
			});
			const { totalItems, currentPage, data, totalPages } = paginate(users, page, limit);

		//	const piket = await calculateTotalPoints(data)
			
			return successResponse(req, res, { data, meta: { totalItems, currentPage, totalPages } }, 200, 'users_retrieved')
		} catch (e) {
			logger.error(`Failed to read all users ${e}`, );
			return res.json({ message: `${e}`, status: 400 });
		}
    }

	async getAllById(req: Request, res: Response){
        try {
			const {id}: any = req.query;
			//const where = dynamicFilter(req.query)
			const users = await UserModel.findOne({
				attributes: {
					exclude: ['password']
				},
				where: {id},
				include: [{ model: PointsModel, as: 'points' }],
			});
			//const piket = await calculateTotalPointsOneUser(users)
			return successResponse(req, res, { users}, 200, 'users_retrieved')
		} catch (e) {
			logger.error(`Failed to read all users ${e}`, );
			return res.json({ message: `${e}`, status: 400 });
		}
    }

	async updatePoints(req: Request, res: Response){
		try{
			const { pointsId } = req.params;
			const schema = Joi.object({
				pointsId: Joi.number().required()
			});

			const {error} = schema.validate(req.params);
			if(error) return schemaFailResponse(req, res, error.details[0].message);

			const record = await PointsModel.update({...req.body}, {where: {pointsId}})
			return successResponse(req, res, record, 201, 'Points-Updated')
		}
		catch(error){
			logger.error(error);
			return res.json({message: `Failed to update points ${error}`, status: 400})
		}
	}

	async deletePoints(req: Request, res: Response){
		try{
		const {pointsId} = req.params;
		const schema = Joi.object({
			pointsId: Joi.number().required()
		});

		const {error} = schema.validate(req.params);
		if(error) return schemaFailResponse(req, res, error.details[0].message);

		const row = await PointsModel.findOne({
			where: {pointsId}
		});
		if(row){
			await row.destroy();
			return successResponse(req, res, row, 201, "Points-deleted")
		}
		else{
			return res.json({message: "Not Found", status: 404})
		}
		}catch(error){
			logger.error(error);
			return res.json({message: "Failed to delete points", error, status: 400})
		}

	}
}
export default new PointsController();