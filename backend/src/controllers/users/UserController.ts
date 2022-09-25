import { Request, Response } from "express";
import userCreateService from "../../services/users/userCreate.service";
import userListService from "../../services/users/userList.service";
import userLoginService from "../../services/users/userLogin.service";

export default class UserController {
  //Criando um User
  async store(req: Request, res: Response) {
    const { username, email, password } = req.newUser;
    const createUser = await userCreateService({
      username,
      email,
      password,
    });

    return res.status(201).json(createUser);
  }
  //Listar todos os usuários
  async index(req: Request, res: Response) {
    const users = await userListService();
    return res.status(200).json(users);
  }
  //Login
  async login(req: Request, res: Response) {
    const { email, password } = req.newLogin;
    const token = await userLoginService({ email, password });
    return res.status(201).json({ token });
  }
}