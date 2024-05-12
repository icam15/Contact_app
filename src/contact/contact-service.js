import {
  createContact,
  dltContact,
  findContact,
  findContacts,
} from "./contact-repository.js";
import userService from "../user/user-service.js";

const addContact = async (id, dataContact) => {
  await userService.getUserById(id);

  const contact = createContact(id, dataContact);
  return contact;
};

const getContacts = async (id) => {
  await userService.getUserById(id);

  const contact = await findContacts(id);
  return contact;
};

const findContactById = async (userId, contactId) => {
  await userService.getUserById(userId);

  const contact = findContact(userId, contactId);
  return contact;
};

const deleteContact = async (userId, contactId) => {
  await userService.getUserById(userId);

  const contact = await dltContact(userId, contactId);
};

export default { addContact, findContactById, getContacts, deleteContact };
