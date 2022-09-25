import { AppDataSource } from "../../data-source";
import Client from "../../models/Client";
import { IClientList } from "../../interfaces/client";

const listClientService = async (): Promise<IClientList[]> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const clients = await clientRepository.find();

  const returnedClient: IClientList[] = [];

  clients.map((c) => {
    returnedClient.push({
      id: c.id,
      username: c.username,
      email: c.email,
      created_at: c.created_at,
      phone: c.phone,
      user: {
        id: c.user.id,
        username: c.user.username,
        email: c.user.email,
      },
    });
  });

  return returnedClient;
};

export default listClientService;
