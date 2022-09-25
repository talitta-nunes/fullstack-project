
import Contact from "../../models/Contact";
import { IContactList } from "../../interfaces/contact";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";


const contactListService = async (): Promise<IContactList[]> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contacts = await contactRepository.find();

  if (contacts.length === 0) throw new AppError("Contato não encontrado", 404);

  const contactResponse: IContactList[] = [];

  contacts.map((contact) => {
    contactResponse.push({
      ...contact,
      client: {
        id: contact.client.id,
        username: contact.client.username,
        email: contact.client.email,
        phone: contact.client.phone,
        created_at: contact.client.created_at,
        user: {
          id: contact.client.user.id,
          username: contact.client.user.username,
          email: contact.client.user.email,
        },
      },
    });
  });

  return contactResponse;
};

export default contactListService;