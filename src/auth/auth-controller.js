import express from "express";
import authService from "./auth-service.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
    try {
        const result = await authService.userRegister(req.body);
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error.message);
    }

});

authRouter.post("/login", async (req, res, next) => {
    try {
        const result = await authService.userLogin(req.body);

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24
        })
        res.status(200).json({
            data: result.data,
            accessToken : result.accessToken
        })
    }catch (error) {
        next(error.message)
    }
})

export {
    authRouter
} 