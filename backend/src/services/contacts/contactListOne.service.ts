import Contact from "../../models/Contact";
import { IContactList } from "../../interfaces/contact";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

const listOneContactService = async (id: string): Promise<IContactList> => {
  if (id.length !== 36) {
    throw new AppError("Identificação do contato não encontrada", 404);
  }

  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({
    id: id,
  });

  if (!contact) throw new AppError("Contato não encontrado", 404);

  const contactResponse: IContactList = {
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
  };

  return contactResponse;
};

export default listOneContactService;
