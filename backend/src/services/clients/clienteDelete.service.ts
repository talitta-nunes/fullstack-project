import { AppDataSource } from "../../data-source";
import Client from "../../models/Client";
import { AppError } from "../../errors/AppError";

const deleteClientService = async (
  id: string,
  user: string
): Promise<Boolean> => {
  const clientRepository = AppDataSource.getRepository(Client);

  if (id.length !== 36) {
    throw new AppError("Identificação do cliente não encontrada", 404);
  }

  const client = await clientRepository.findOneBy({
    id: id,
  });
  
  if (!client) {
    throw new AppError("Cliente não encontrado", 404);
  }
  
  if (client.user.id !== user) {
    throw new AppError("Você não tem permissão pra deletar cliente", 404);
  }

  await clientRepository.delete(client!.id);

  return true;
};

export default deleteClientService;
