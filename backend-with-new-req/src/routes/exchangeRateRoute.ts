import express from "express";
import { exchangeRateController } from "../controllers";
import { hasPermission, verifyToken } from "../middleware/auth";

const router = express.Router();

router.get('/',
            [
                verifyToken,
                hasPermission(['exchange_view'])
            ],
            exchangeRateController.readExchangeRate
            );
router.put(
    "/:id",
    [
        verifyToken,
        hasPermission(['exchange_update'])
    ],
    exchangeRateController.updateExchangeRate
);

export default router;