import { Router } from "express";
import UserController from "../controllers/users/UserController";
import { validateUserCreate } from "../middlewares/handleUserErrorMiddleware";
import { handleUserError } from "../middlewares/handleUserErrorMiddleware";

const userRouter = Router();
const userController = new UserController();
userRouter.post("", validateUserCreate(handleUserError), userController.store);
userRouter.get("", userController.index);

export default userRouter;
