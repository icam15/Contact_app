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

export { findUserById, userImage, userPhone };
