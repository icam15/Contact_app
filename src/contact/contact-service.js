import {
  contactAddress,
  contactAddressEdit,
  contactEdit,
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

const editContact = async (userId, contactId, newDataContact) => {
  await userService.getUserById(userId);

  const contact = await contactEdit(userId, contactId, newDataContact);
  return contact;
};

const addContactAddress = async (userId, contactId, dataAddress) => {
  await findContactById(userId, contactId);

  const contact = await contactAddress(contactId, dataAddress);
  return contact;
};

const editContactAddress = async (userId, contactId, editDataAddress) => {
  await userService.getUserById(userId);

  const contact = await contactAddressEdit(contactId, editDataAddress);
  return contact;
};

export default {
  addContact,
  findContactById,
  getContacts,
  deleteContact,
  editContact,
  addContactAddress,
  editContactAddress,
};
