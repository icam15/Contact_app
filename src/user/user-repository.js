import { prisma } from "../db/database.js";

const findUserById = async (id) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      username: true,
      email: true,
    },
  });
  return user;
};

const userPhone = async (id, phone) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      phone,
    },
    select: {
      username: true,
      phone: true,
    },
  });
  return user;
};

const userImage = async (id, image) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      profile_picture: image,
    },
    select: {
      username: true,
      profile_picture: true,
    },
  });
  return user;
};

const editUser = async (id, userData) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username: userData.username,
      email: userData.email,
      phone: parseInt(userData.phone),
    },
  });
  return user;
};

const userAddress = async (id, dataAddress) => {
  const user = await prisma.user_address.create({
    data: {
      city: dataAddress.city,
      street: dataAddress.street,
      country: dataAddress.country,
      user_id: id,
    },
  });
  return user;
};

const logout = async (id) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      refresh_token: null,
    },
  });
};

const checkEmail = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user;
};

const checkPhone = async (phone) => {
  const user = await prisma.user.findFirst({
    where: {
      phone,
    },
  });
  return user;
};

export {
  findUserById,
  userImage,
  userPhone,
  editUser,
  checkEmail,
  checkPhone,
  logout,
  userAddress
};
