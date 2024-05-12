import express from "express";
import authService from "./auth-service.js";
import { url } from "../lib/google.oauth.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const result = await authService.userRegister(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error.message);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const result = await authService.userLogin(req.body);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(200).json({
      data: result.data,
      token: result.accessToken,
    });
  } catch (error) {
    next(error.message);
  }
});

authRouter.get("/google", (req, res) => {
  res.redirect(url);
});

authRouter.get("/google/callback", async (req, res, next) => {
  try {
    const { code } = req.query;
    const result = await authService.userLoginGoogle(code);
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
    res.status(200).json({
      token: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/token", async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const result = await authService.newAccessToken(token);
    res.status(200).json({
      token: result.newToken,
    });
  } catch (error) {
    console.log(error);
  }
});

export { authRouter };

