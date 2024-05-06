import { ResponseError } from "../app/error.js";
import bcrypt from "bcrypt";
import { checkUserExist, createNewUser } from "./auth-repository.js";

const userRegister = async (userData) => {
    const user = await checkUserExist(userData.email);

    if(user) {
        throw new ResponseError(400, "your email is exist in our data");
    }

    await bcrypt.hash(userData.password, 10);

    const createUser = createNewUser(userData);

    return createUser
}

const userLogin = async (userData) => {
    const user = checkUserExist();

    if(!user) {
        throw new ResponseError(400, "username or password is wrong")
    }

    const isPassowrdValid = await bcrypt.compare(userData.password, user.password)

    if(!isPassowrdValid) {
        throw new ResponseError(400, "username or password is wrong");
    }

    console.log("good for this step")
}

export default {
    userRegister,
    userLogin
}