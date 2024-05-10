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

userRouter.post("/:id/phone", async (req, res) => {
  try {
    const id = req.user.id;
    const userPhone = parseInt(req.body.phone);
    const result = await userService.addUserPhoneById(id, userPhone);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/image", async (req, res) => {
  try {
    const id = req.user.id;
    const userImage = req.body.image;
    const result = await userService.addUserImageById(id, userImage);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

export { userRouter };
