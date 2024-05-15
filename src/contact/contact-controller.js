import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import contactService from "./contact-service.js";
import { validate } from "../validation/validation.js";
import {
  addContactAddressValidation,
  contacCreateValidation,
  contacEditValidation,
  editContactAddressValidation,
} from "../validation/contact-validation.js";

const contactRouter = express.Router();

contactRouter.use(authMiddleware);

contactRouter.get("/", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await contactService.getContacts(userId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

contactRouter.post("/add", async (req, res, next) => {
  try {
    const id = req.user.id;
    const dataContact = req.body;
    const validation = validate(contacCreateValidation, dataContact);
    const result = await contactService.addContact(id, validation);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

contactRouter.get("/:id", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactId = parseInt(req.params.id);
    const result = await contactService.findContactById(userId, contactId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

contactRouter.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacId = parseInt(req.params.id);
    const result = await contactService.deleteContact(userId, contacId);
    res.status(200).json({
      data: "Contac deleted",
    });
  } catch (error) {
    next(error);
  }
});

contactRouter.patch("/:id/edit", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactId = parseInt(req.params.id);
    const newDataContact = req.body;
    const validation = validate(contacEditValidation, newDataContact);
    const result = await contactService.editContact(
      userId,
      contactId,
      validation
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

contactRouter.post("/:id/address", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactId = parseInt(req.params.id);
    const dataAddress = req.body;
    const validation = validate(addContactAddressValidation, dataAddress);
    const result = await contactService.addContactAddress(
      userId,
      contactId,
      validation
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

contactRouter.patch("/:id/address/edit", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactId = parseInt(req.params.id);
    const newDataAddress = req.body;
    const validation = validate(editContactAddressValidation, newDataAddress);
    const result = await contactService.editContactAddress(
      userId,
      contactId,
      validation
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export { contactRouter };
