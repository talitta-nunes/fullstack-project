import { Router } from "express";
import ContactController from "../controllers/contacts/ContactController";
import { handleContactError, validateContactCreate } from "../middlewares/handleContactErrorMiddleware";
import { handleAuthUserMiddleware } from "../middlewares/handleAuthUser.Middleware";

const contactRouter = Router();
const contactController = new ContactController();
contactRouter.post(
  "/:clientId",
  handleAuthUserMiddleware,
  validateContactCreate(handleContactError),
  contactController.store
);
contactRouter.get("", contactController.index);
contactRouter.get("/:id", handleAuthUserMiddleware, contactController.show);
contactRouter.patch("/:id", handleAuthUserMiddleware, contactController.update);
contactRouter.delete("/:id", handleAuthUserMiddleware, contactController.delete);

export default contactRouter;
