import express from "express";
import userService from "./user-service.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { validate } from "../validation/validation.js";
import {
  editUserValidation,
  userAddressValidation,
  userImageValidation,
  userPhoneValidation,
} from "../validation/user-validation.js";
import { logger } from "../lib/logging.js";

const userRouter = express.Router();

userRouter.use(authMiddleware);
userRouter.get("/", async (req, res, next) => {
  try {
    const result = await userService.getUserById(req.user.id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/phone", async (req, res, next) => {
  try {
    const id = req.user.id;
    const userPhone = req.body.phone;
    const validation = validate(userPhoneValidation, userPhone);
    const result = await userService.addUserPhoneById(id, parseInt(validation));
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

userRouter.post("/image", async (req, res, next) => {
  try {
    const id = req.user.id;
    const userImage = req.body.image;
    const validation = validate(userImageValidation, userImage);
    const result = await userService.addUserImageById(id, validation);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.patch("/edit", async (req, res, next) => {
  try {
    const id = req.user.id;
    const userData = req.body;
    const validation = validate(editUserValidation, userData);
    const result = await userService.editUserById(id, validation);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/address", async (req, res) => {
  try {
    const id = req.user.id;
    const dataAddress = req.body;
    const validation = validate(userAddressValidation, dataAddress);
    const result = await userService.addUserAddress(id, validation);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
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
