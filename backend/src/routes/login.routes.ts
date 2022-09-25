import { Router } from "express";
import UserController from "../controllers/users/UserController";
import {handleLoginError} from "../middlewares/handleUserLoginMiddleware";
import { validateLoginCreate } from "../middlewares/handleUserLoginMiddleware";

const loginRouter = Router();
const userController = new UserController();

loginRouter.post(
  "",
  validateLoginCreate(handleLoginError),
  userController.login
);

export default loginRouter;
