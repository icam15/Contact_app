import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import contactService from "./contact-service.js";

const contactRouter = express.Router();

contactRouter.use(authMiddleware);

contactRouter.post("/", async (req, res) => {
  try {
    const id = req.user.id;
    const dataContact = req.body;
    const result = await contactService.addContact(id, dataContact);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

contactRouter.get("/:id", async (req, res) => {
  try {
    const userId = req.user.id;
    const contactId = parseInt(req.params.id);
    const result = await contactService.findContactById(userId, contactId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

contactRouter.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await contactService.getContacts(userId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

contactRouter.delete("/:id", async (req, res) => {
  try {
    const userId = req.user.id;
    const contacId = parseInt(req.params.id);
    const result = await contactService.deleteContact(userId, contacId);
    res.status(200).json({
      data: "Contac deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

contactRouter.patch("/:id/edit", async (req, res) => {
  try {
    const userId = req.user.id;
    const contactId = parseInt(req.params.id);
    const newDataContact = req.body;
    const result = await contactService.editContact(
      userId,
      contactId,
      newDataContact
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

contactRouter.post("/:id/address", async (req, res) => {
  try {
    const userId = req.user.id;
    const contactId = parseInt(req.params.id);
    const dataAddress = req.body;
    const result = await contactService.addContactAddress(
      userId,
      contactId,
      dataAddress
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

contactRouter.patch("/:id/address/edit", async (req, res) => {
  try {
    const userId = req.user.id;
    const contactId = parseInt(req.params.id);
    const newDataAddress = req.body;
    const result = await contactService.editContactAddress(
      userId,
      contactId,
      newDataAddress
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

export { contactRouter };
