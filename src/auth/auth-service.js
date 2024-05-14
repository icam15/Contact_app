import { ResponseError } from "../lib/error.js";
import bcrypt from "bcrypt";
import {
  addRefreshTokenUser,
  checkUserExist,
  createNewUser,
  createUserGoogle,
  findUserToken,
} from "./auth-repository.js";
import { generateAccesToken, generateRefreshToken } from "../lib/jwt.js";
import { oauthClient } from "../lib/google.oauth.js";
import { google } from "googleapis";
import { loginEmailNotification } from "../lib/email.js";

const userRegister = async (userData) => {
  const user = await checkUserExist(userData.email);

  if (user) {
    throw new ResponseError(400, "your email is exist in our data");
  }

  userData.password = await bcrypt.hash(userData.password, 10);

  const createUser = createNewUser(userData);

  return createUser;
};

const userLogin = async (userData) => {
  const user = await checkUserExist(userData.email);

  if (!user) {
    throw new ResponseError(400, "email or password is wrong");
  }

  const isPasswordValid = bcrypt.compare(userData.password, user.password);

  if (!isPasswordValid) {
    throw new ResponseError(400, "email or password is wrong");
  }

  const jwtPayload = {
    id: user.id,
    username: user.username,
  };

  const JwtAccessToken = await generateAccesToken(jwtPayload);
  const jwtRefreshToken = await generateRefreshToken(jwtPayload);

  const addTokenUser = await addRefreshTokenUser(user.id, jwtRefreshToken);

  loginEmailNotification(user.email);

  return {
    accessToken: JwtAccessToken,
    refreshToken: jwtRefreshToken,
  };
};

const userLoginGoogle = async (code) => {
  const { tokens } = await oauthClient.getToken(code);
  oauthClient.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauthClient,
    version: "v2",
  });

  const { data } = await oauth2.userinfo.get();

  if (!data) {
    throw new ResponseError(400, "User Google not found");
  }

  let addUserGoogle = await checkUserExist(data.email);

  const jwtPayload = {
    id: data.id,
    name: data.name,
  };

  const JwtAccessToken = await generateAccesToken(jwtPayload);
  const jwtRefreshToken = await generateRefreshToken(jwtPayload);

  if (!addUserGoogle) {
    createUserGoogle(data);
  }

  loginEmailNotification(data.email);

  return {
    accessToken: JwtAccessToken,
    refreshToken: jwtRefreshToken,
  };
};

const newAccessToken = async (token) => {
  if (!token) {
    throw new ResponseError(400, "You need to login");
  }

  const findToken = await findUserToken(token);
  if (!findToken) {
    throw new ResponseError(400, "User Unauthorization");
  }

  const jwtPayload = {
    id: findToken.id,
    username: findToken.username,
  };

  const jwtNewAccessToken = await generateAccesToken(jwtPayload);

  return {
    newToken: jwtNewAccessToken,
  };
};

export default {
  userRegister,
  userLogin,
  userLoginGoogle,
  newAccessToken,
};
