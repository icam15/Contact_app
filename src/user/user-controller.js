import express from "express";
import userService from "./user-service.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = express.Router();

userRouter.use(authMiddleware);
userRouter.get("/", async (req, res) => {
  try {
    const result = await userService.getUserById(req.user.id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

export { userRouter };
