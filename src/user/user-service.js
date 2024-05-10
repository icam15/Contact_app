import { ResponseError } from "../lib/error.js";
import { userImage, findUserById, userPhone } from "./user-repository.js";

const getUserById = async (id) => {
  const user = await findUserById(id);

  if (!user) {
    throw new ResponseError(400, "User not Found");
  }

  return user;
};

const addUserPhoneById = async (id, phone) => {
  await getUserById(id);

  const user = await userPhone(id, phone);
  return user;
};

const addUserImageById = async (id, image) => {
  await getUserById(id);

  const user = await userImage(id, image);
  return user;
};

export default {
  getUserById,
  addUserPhoneById,
  addUserImageById,
};
