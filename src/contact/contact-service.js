import { createContact, findContact } from "./contact-repository.js";
import userService from "../user/user-service.js";

const addContact = async (id, dataContact) => {
  await userService.getUserById(id);

  const contact = createContact(id, dataContact);
  return contact;
};

const findContactById = async (userId, contactId) => {
  await userService.getUserById(userId);

  const contact = findContact(userId, contactId);
  return contact;
};

export default { addContact, findContactById };
