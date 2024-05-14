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
      phone: parseInt(newDataContact.phone),
    },
  });
  return contact;
};

const contactAddress = async (contactId, dataAddress) => {
  const contact = await prisma.contact_address.create({
    data: {
      city: dataAddress.city,
      country: dataAddress.country,
      street: dataAddress.street,
      contact_id: contactId,
    },
  });
  return contact;
};

const contactAddressEdit = async (contacId, newDataAddress) => {
  const contact = await prisma.contact_address.update({
    where: {
      contact_id: contacId,
    },
    data: {
      city: newDataAddress.city,
      country: newDataAddress.country,
      street: newDataAddress.street,
    },
  });
  return contact;
};

export {
  createContact,
  findContact,
  findContacts,
  dltContact,
  contactEdit,
  contactAddress,
  contactAddressEdit,
};
