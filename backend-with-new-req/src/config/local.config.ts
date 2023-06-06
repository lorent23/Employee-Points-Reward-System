import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();



const dbConfig: any = {
	DB_URL: process.env.DB_URL,
	HOST: process.env.DB_HOST,
	USER: process.env.DB_USER,
	PASSWORD: process.env.DB_PASSWORD,
	DB: process.env.DB_NAME,
	PORT: parseInt(process.env.DB_PORT || "5432"),
	dialect: "postgres",
};

export const local = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	port: dbConfig.PORT,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

