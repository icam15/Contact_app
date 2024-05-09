import { prisma } from "../db/database.js";

const checkUserById = async (id) => {
  const getUser = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      username: true,
      profile_picture: true,
      email: true,
    },
  });
  return getUser;
};

export { checkUserById };
