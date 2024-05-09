import express from "express";
import dotnev from "dotenv";
import cookieParser from "cookie-parser";
import { authRouter } from "./auth/auth-controller.js";
import { authMiddleware } from "./middleware/auth-middleware.js";
import { userRouter } from "./user/user-controller.js";
dotnev.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server run at port ${port}`);
});
