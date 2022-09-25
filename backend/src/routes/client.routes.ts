import { Router } from "express";
import ClientController from "../controllers/clients/ClientController";
import {
  validateClientCreate,
  handleClientError,
} from "../middlewares/handleUserClientErrorMiddleware";
import { handleAuthUserMiddleware } from "../middlewares/handleAuthUser.Middleware";

const clientRouter = Router();
const clientController = new ClientController();
clientRouter.post(
  "",
  handleAuthUserMiddleware,
  validateClientCreate(handleClientError),
  clientController.store
);
clientRouter.get("", clientController.index);
clientRouter.get("/:id", handleAuthUserMiddleware, clientController.show);
clientRouter.patch("/:id", handleAuthUserMiddleware, clientController.update);
clientRouter.delete("/:id", handleAuthUserMiddleware, clientController.delete);

export default clientRouter;
