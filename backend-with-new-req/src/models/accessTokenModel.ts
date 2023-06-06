import { DataTypes, Model } from "sequelize";
import { db } from "../config";

export class AccessTokenModel extends Model<any>{}

AccessTokenModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
		sequelize: db,
		tableName: 'accessToken',
		timestamps: true
	}
);