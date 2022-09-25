import { AppDataSource } from "../../data-source";
import Client from "../../models/Client";
import { AppError } from "../../errors/AppError";
import { IClientUpdate } from "../../interfaces/client";

const updateClientService = async ({
  username,
  email,
  phone,
  id,
  user,
}: IClientUpdate): Promise<Client> => {
  if (id.length !== 36) {
    throw new AppError("Identificação do cliente não encontrada", 404);
  }

  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where : {id},
  });
  console.log(id)
  console.log(user)
  console.log(client)
  if (!client) {
    throw new AppError("Cliente não encontrado", 404);
  }

  if (client?.user.id !== user) {
    throw new AppError("Você não tem permissão para atualizar cliente", 403);
  }
 
  username ? (client.username = username) : client.username;
  phone ? (client.phone = phone) : client.phone;
  email ? (client.email = email) : client.email;

  await clientRepository.save(client);

  return client;
};

export default updateClientService;
