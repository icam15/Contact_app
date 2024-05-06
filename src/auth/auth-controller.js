import express from "express";
import { logger } from "../app/logging.js";
import authService from "./auth-service.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    try {
        // const newUserData = req.body
        const result = await authService.userRegister(req.body);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        logger.error(error);
        console.log(error);
    }

});

authRouter.post("/login", async (req, res) => {
    try {

    }catch (error) {
        logger.error(error)
        console.log(error)
    }
})

export {
    authRouter
}