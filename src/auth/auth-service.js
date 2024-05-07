import { ResponseError } from "../app/error.js";
import bcrypt from "bcrypt";
import { addRefreshTokenUser, checkUserExist, createNewUser } from "./auth-repository.js";
import { generateAccesToken, generateRefreshToken } from "../app/jwt.js";

const userRegister = async (userData) => {
    const user = await checkUserExist(userData.email)

    if(user) {
        throw new ResponseError(400, "your email is exist in our data")
    }

    userData.password = await bcrypt.hash(userData.password, 10);

    const createUser = createNewUser(userData)

    return createUser
}

const userLogin = async (userData) => {
    const user = await checkUserExist(userData.email);

    if(!user) {
        throw new ResponseError(400, "email or password is wrong")
    }

    const isPassowrdValid = bcrypt.compare(userData.password, user.password)

    if(!isPassowrdValid) {
        throw new ResponseError(400, "email or password is wrong");
    }

    const jwtPayload = {
        id: user.id,
        id: user.email
    }

    const JwtAccessToken = await generateAccesToken(jwtPayload);
    const jwtRefreshToken = await generateRefreshToken(jwtPayload);

    const addTokenUser = addRefreshTokenUser(user.id, jwtRefreshToken);

    return {
        accessToken : JwtAccessToken,
        refreshToken : jwtRefreshToken
    }
}

export default {
    userRegister,
    userLogin
}