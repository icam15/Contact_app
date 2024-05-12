import { prisma } from "../db/database.js";

const createContact = async (id, dataContact) => {
  const contact = await prisma.contact.create({
    data: {
      first_name: dataContact.first_name,
      last_name: dataContact.last_name,
      phone: parseInt(dataContact.phone),
      user_id: id,
    },
  });
  return contact;
};

const findContact = async (userId, contactId) => {
  const contact = await prisma.contact.findFirst({
    where: {
      id: contactId,
      user_id: userId,
    },
  });
  return contact;
};

export { createContact, findContact };
