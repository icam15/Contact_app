import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const generateAccesToken = async (payload) => {
    const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "60s"
    });

    return token
}


const generateRefreshToken = async (payload) => {
    const token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: "1h"
    });

    return token 
}

export {
    generateAccesToken,
    generateRefreshToken
}