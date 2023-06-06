import express,{Express, RequestHandler} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authRoute, userRoute,pointsRoute, exchangeRateRoute } from "./routes";

dotenv.config()


const app = express(); 

app.use(cors());

//For parsin application/json
app.use(express.json() as RequestHandler);

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }) as RequestHandler);

app.use(cookieParser());

app.get("/", (req: any, res: any)=>{
    res.json({
        message: "Welcome to the points application"
    })
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/points", pointsRoute);
app.use("/api/exchange", exchangeRateRoute);

export default app;
