import { Request, Response } from "express";
import createContactService from "../../services/contacts/contactCreate.service";
import contactListService from "../../services/contacts/contactList.service";
import deleteContactService from "../../services/contacts/contactDelete.service";
import updateContactService from "../../services/contacts/contactUpdate.service";
import listOneContactService from "../../services/contacts/contactListOne.service";

export default class ContactController {
  async store(req: Request, res: Response) {
    const { username, phone, email } = req.newContact;
    const user = req.user.id;
    const clientId = req.params.id
    const contact = await createContactService({
      username,
      phone,
      email,
      user,
      clientId,
    });
    return res.status(201).json(contact);
  }

  async index(req: Request, res: Response) {
    const contacts = await contactListService();
    return res.status(200).json(contacts);
  }
  async show(req: Request, res: Response) {
    const id = req.params.id;
    const contact = await listOneContactService(id);
    return res.status(200).json(contact);
  }

  async update(req: Request, res: Response) {
    const { username, phone, email,clientId } = req.body;
    const id = req.params.id;
    const user = req.user.id;
    await updateContactService({
      username,
      phone,
      email,
      id,
      user,
      clientId,
    });

    return res.status(200).json({ message: "Contato atualizado!" });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.user.id;
    await deleteContactService(id, user);
    return res.status(200).json({ message: "Contato Deletado" });
  }
  
}
