import Contact from "../../models/Contact";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { IContactUpdate } from "../../interfaces/contact";

const updateContactService = async ({
  username,
  email,
  phone,
  id,
  user,
  clientId,
}: IContactUpdate): Promise<Contact> => {
  if (id.length !== 36) {
    throw new AppError("Identificação do contato não encontrada", 404);
  }

  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({
    id: id,
  });

  if (!contact) {
    throw new AppError("Contato não encontrado", 404);
  }

  if (contact.client?.user.id !== user) {
    throw new AppError("Você não tem permissão para atualizar", 403);
  }

  if(clientId) throw new AppError("Não é permitido atualizar o id do cliente", 403);

  username ? (contact.username = username) : contact.username;
  phone ? (contact.phone = phone) : contact.phone;
  email ? (contact.email = email) : contact.email;

  await contactRepository.save(contact);

  return contact;
};

export default updateContactService;
