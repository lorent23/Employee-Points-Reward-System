import { DataTypes, Model } from "sequelize";
import {db} from "../config";
import { PointsAttributes } from "../utils/types";
import { UserModel } from "./userModel";

export class PointsModel extends Model<PointsAttributes>{}

PointsModel.init(
    {   
        pointsId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        numberOfPoints: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pointsType: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
    {
		sequelize: db,
		tableName: 'points',
		timestamps: true,
	}
);
UserModel.hasMany(PointsModel, {as: "points", foreignKey: "id"})