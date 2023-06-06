import bcrypt from "bcrypt";
import { permissions } from "./utils/permissionList";
import { RoleModel, UserModel, ExchangeRateModel } from "./models";
import { db } from "./config";
import dotenv from "dotenv";
import app from "./app";
import {logger} from "./utils/logger";

dotenv.config();

db.sync({force: true}).then(() => {
    logger.info("Connected to the database");
   initial()
   exchangeRate()
   roleCreate() 
} ).catch((error: any) => {
    logger.error("Failed to connect to the database", error);
});

const port = process.env.PORT

app.listen(port, () => {
	logger.info("server is running on port " + port)
});

const initial = async () =>{
    await RoleModel.create({
        roleId: 1,
        name: "admin",
        description: "Admin role",
        permissions: permissions
    }).then(async (data: any) => {
        await UserModel.create({
            id: 1,
            firstName: "First",
            lastName: "Admin",
            email: "firstadmin@first.al",
            password: await bcrypt.hash('12345678', 10),
            isVerified: true,
            roleId: 1
        })
        //console.log(data.id)
    })
}

const exchangeRate = async () => {
    await ExchangeRateModel.create({
        id: 1,
        exchangeRate: 0.5
    })

}
const roleCreate = async () => {
    await RoleModel.create({
        roleId: 2,
        name: "user",
        description: "user Role",
        permissions: ["user_view", 'points_view', 'points_list']
    })
}
