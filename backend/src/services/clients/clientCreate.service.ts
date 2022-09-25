import Client from "../../models/Client";
import User from "../../models/User";
import { IClientRequest} from "../../interfaces/client";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError"

const clientCreateService = async ({
  username,
  email,
  phone,
  user,
}: IClientRequest): Promise<Client> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const userRepository = AppDataSource.getRepository(User);

  const findClient = await clientRepository.findOne({
    where: { username },
  });

  const userAdm = await userRepository.findOneBy({
    id: user,
  });

  if (userAdm?.id !== user) {
    throw new AppError("Você não tem permissão para adicionar cliente", 403);
  }

  if (findClient) {
    throw new AppError("Cliente já cadastrado", 403);
  }

  const client = await clientRepository.create({
    username,
    email,
    phone,
    user: user,
  });

  await clientRepository.save(client);

  return client;
};
export default clientCreateService;
