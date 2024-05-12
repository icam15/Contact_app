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

export { contactRouter };
