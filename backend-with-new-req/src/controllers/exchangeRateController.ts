import { dynamicFilter } from "../utils";
import Joi from "joi";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { successResponse, schemaFailResponse } from "../utils/formatResponse";
import { ExchangeRateModel } from "../models";

dotenv.config();

class ExchangeRateController{
    async readExchangeRate(req: Request, res: Response){
        const exchange = await ExchangeRateModel.findAll();

        return successResponse(req, res, {exchange}, 200, 'Exchange-rate-returned');
    }
    async updateExchangeRate(req: Request, res: Response){
        const {id} = req.params
        // const schema = Joi.object({
        //     exchangeRate: Joi.number().required()
        // });

        // const {error} = schema.validate(req.params);
        // if(error) return schemaFailResponse(req, res, error.details[0].message);

        const record = await ExchangeRateModel.update({...req.body}, {where: {id: id}})
        return successResponse(req, res, record, 201, 'exchange-rate-updated');
    }
}
export default new ExchangeRateController();