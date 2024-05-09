import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  const getJwt = req.headers["authorization"];
  if (!getJwt) {
    res.status(401).json({
      errors: "User Unauthorization",
    });
  }

  const jwtToken = getJwt.split(" ")[1];
  const secret = process.env.JWT_ACCESS_TOKEN;

  try {
    const jwtDecode = jwt.verify(jwtToken, secret);
    req.user = jwtDecode;
  } catch (error) {
    console.log(error);
  }
  next();
};
