import { ResponseError } from "../lib/error.js";
import { checkUserById } from "./user-repository.js";

const getUserById = async (id) => {
  const user = checkUserById(id);

  if (!user) {
    throw new ResponseError(400, "User not Found");
  }

  return user;
};

export default {
  getUserById,
};
