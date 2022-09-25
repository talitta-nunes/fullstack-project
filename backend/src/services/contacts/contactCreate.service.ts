import Client from "../../models/Client";
import Contact from "../../models/Contact";
import { IContactRequest, IContactList } from "../../interfaces/contact";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

const contactCreateService = async ({
  username,
  email,
  phone,
  clientId,
  user,
}: IContactRequest): Promise<IContactList> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);

  const contactData = await contactRepository.find();
  const client = await clientRepository.findOne({
    where: { id: clientId },
  });

  if (!client) throw new AppError("Cliente não encontrado", 404);

  if (client.user.id !== user)
    throw new AppError("Você não tem permissão de acesso", 403);
    
  if (contactData.find((ct) => ct.email === email))
    throw new AppError("Contato já pertence a um cliente", 400);

  const contact = contactRepository.create({
    username,
    email,
    phone,
  });

  contact.client = client;

  await contactRepository.save(contact);

  return contact;
};

export default contactCreateService;
