import { ResponseError } from "../lib/error.js";
import {
  userImage,
  findUserById,
  userPhone,
  editUser,
  checkEmail,
  checkPhone,
  logout,
  userAddress,
  checkUsername,
} from "./user-repository.js";

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

const editUserById = async (id, userData) => {
  await getUserById(id);

  const email = await checkEmail(userData.email);
  const phone = await checkPhone(parseInt(userData.phone));
  const username = await checkUsername(userData.username);
  if (email) {
    throw new ResponseError(400, "Email is already used");
  } else if (phone) {
    throw new ResponseError(400, "Phone is already used");
  } else if (username) {
    throw new ResponseError(400, "Username is already used");
  }

  const user = await editUser(id, userData);
  return user;
};

const userLogout = async (id) => {
  await getUserById(id);

  const user = await logout(id);
  return user;
};

const addUserAddress = async (id, address) => {
  await getUserById(id);

  const user = userAddress(id, address);
  return user;
};

export default {
  getUserById,
  addUserPhoneById,
  addUserImageById,
  editUserById,
  userLogout,
  addUserAddress,
};
