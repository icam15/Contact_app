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

const addUserPhone = async (id, userPhone) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      phone: userPhone,
    },
    select: {
      username: true,
      phone: true,
    },
  });
  return user;
};

export { findUserById, addUserPhone };
