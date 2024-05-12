import { prisma } from "../db/database.js";

const createContact = async (userId, dataContact) => {
  const contact = await prisma.contact.create({
    data: {
      first_name: dataContact.first_name,
      last_name: dataContact.last_name,
      phone: parseInt(dataContact.phone),
      user_id: userId,
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

const findContacts = async (userId) => {
  const contact = await prisma.contact.findMany({
    where: {
      user_id: userId,
    },
  });
  return contact;
};

const dltContact = async (userId, contactId) => {
  const contact = await prisma.contact.delete({
    where: {
      user_id: userId,
      id: contactId,
    },
  });
};

const contactEdit = async (userId, contactId, newDataContact) => {
  const contact = await prisma.contact.update({
    where: {
      id: contactId,
      user_id: userId,
    },
    data: {
      first_name: newDataContact.first_name,
      last_name: newDataContact.last_name,
      phone: newDataContact.phone,
    },
  });
  return contact;
};

export { createContact, findContact, findContacts, dltContact, contactEdit };
