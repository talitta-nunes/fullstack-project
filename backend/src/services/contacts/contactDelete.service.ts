import Contact from "../../models/Contact";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

const deleteContactService = async (
  id: string,
  user: string
): Promise<Boolean> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  if (id.length !== 36) {
    throw new AppError("Identificação do contato não encontrada", 404);
  }

  const contact = await contactRepository.findOneBy({
    id: id,
  });

  if (!contact) {
    throw new AppError("Contato não encontrado", 404);
  }

  if (contact.client.user.id !== user) {
    throw new AppError("Você não tem permissão pra deletar", 404);
  }

  await contactRepository.delete(contact!.id);

  return true;
};

export default deleteContactService;
