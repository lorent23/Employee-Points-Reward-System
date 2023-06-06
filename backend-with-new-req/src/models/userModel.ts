import { DataTypes, Model } from "sequelize";
import {db} from "../config";
import { RoleModel } from "./roleModel";
import { AccessTokenModel } from "./accessTokenModel";
import { UserAttributes } from "../utils/types";

export class UserModel extends Model<UserAttributes>{}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type:DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        totalPoints: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        }

    },
    {
		sequelize: db,
		tableName: 'users',
		timestamps: true,
		indexes: [
			{
				unique: true,
				fields: ['email']
			},
			{
				unique: true,
				fields: ['id']
			},
		]
	}
);
UserModel.hasOne(AccessTokenModel, { as: 'user', foreignKey: 'userId' });
UserModel.belongsTo(RoleModel, { as: 'role', foreignKey: 'roleId' })