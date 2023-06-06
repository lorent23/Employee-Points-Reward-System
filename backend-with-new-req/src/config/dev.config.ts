
import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();




const dbConfig: any = {
	DB_URL: process.env.DB_URL,
};
console.log(dbConfig)
export const dev = new Sequelize(dbConfig.DB_URL, {
	dialectOptions: {
		ssl: {
			require: false,
			rejectUnauthorized: false
		}
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});


