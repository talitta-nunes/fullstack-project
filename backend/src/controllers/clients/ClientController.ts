import { Request, Response } from "express";
import clientCreateService from "../../services/clients/clientCreate.service";
import listClientService from "../../services/clients/clientList.service";
import deleteClientService from "../../services/clients/clienteDelete.service";
import updateClientService from "../../services/clients/clienteUpdate.service";
import listOneClientService from "../../services/clients/clienteListOne.service";

export default class ClientController {
  async store(req: Request, res: Response) {
    const { username, phone, email } = req.body;
    const user = req.user.id;
    const client = await clientCreateService({
      username,
      phone,
      email,
      user,
    });
    return res.status(201).json(client);
  }

  async index(req: Request, res: Response) {
    const clients = await listClientService();
    return res.status(200).json(clients);
  }
  async show(req: Request, res: Response) {
    const id = req.params.id;
    const client = await listOneClientService(id);
    return res.status(200).json(client);
  }

  async update(req: Request, res: Response) {
    const { username, phone, email } = req.body;
    const id = req.params.id;
    const user = req.user.id;
    await updateClientService({
      username,
      phone,
      email,
      id,
      user,
    });

    return res.status(200).json({ message: "Cliente atualizado!" });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.user.id;
    await deleteClientService(id, user);
    return res.status(200).json({ message: "Cliente Deletado" });
  }
}