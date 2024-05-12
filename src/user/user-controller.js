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

userRouter.post("/phone", async (req, res) => {
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
      data: result.username,
    });
  } catch (error) {
    console.log(error);
  }
});

userRouter.patch("/edit", async (req, res) => {
  try {
    const id = req.user.id;
    const userData = req.body;
    const result = await userService.editUserById(id, userData);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

userRouter.patch("/logout", async (req, res) => {
  try {
    const id = req.user.id;
    const result = await userService.userLogout(id);
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    console.log(error);
  }
});

export { userRouter };
