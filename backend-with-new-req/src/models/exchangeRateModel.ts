import { DataTypes, Model } from "sequelize";
import {db} from "../config";
import { exchangeAttributes } from "../utils/types";

export class ExchangeRateModel extends Model<exchangeAttributes>{}

ExchangeRateModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        exchangeRate:{
            type: DataTypes.FLOAT,
            allowNull: false
        } 
    },
    {
		sequelize: db,
		tableName: 'exchange',
		timestamps: true,
	}
)