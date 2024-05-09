import { ResponseError } from "../lib/error.js";
import { addUserPhone, findUserById } from "./user-repository.js";

const getUserById = async (id) => {
  const user = await findUserById(id);

  if (!user) {
    throw new ResponseError(400, "User not Found");
  }

  return user;
};

const addUserPhoneById = async (id, userPhone) => {
  await getUserById(id);

  const user = await addUserPhone(id, userPhone);
  return user;
};

export default {
  getUserById,
  addUserPhoneById,
};
