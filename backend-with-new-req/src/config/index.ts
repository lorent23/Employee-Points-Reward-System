import { local } from "./local.config";
import { dev } from "./dev.config";
import dotenv from "dotenv";

dotenv.config();

export const db = local;