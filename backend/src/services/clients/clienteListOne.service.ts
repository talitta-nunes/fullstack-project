import { AppDataSource } from "../../data-source";
import Client from "../../models/Client";
import { AppError } from "../../errors/AppError";
import { IClientList } from "../../interfaces/client";

const listOneClientService = async (id: string): Promise<IClientList> => {
  if (id.length !== 36) {
    throw new AppError("Identificação do cliente não encontrada", 404);
  }

  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    id: id,
  });

  if (!client) throw new AppError("Cliente não encontrado", 404);

  const clientReponse: IClientList = {
    ...client,
    user: {
      id: client.user.id,
      username: client.user.username,
      email: client.user.email,
    },
  };

  return clientReponse;
};

export default listOneClientService;
