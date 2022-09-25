import User from "../../models/User";
import { hash } from "bcryptjs";
import { IUserRequest, IUser } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError"


const userCreateService = async ({
  username,
  email,
  password
}: IUserRequest) : Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const checkUserExists = await userRepository.findOne({
    where: {
      email,
    },
  });
  if (checkUserExists) {
    throw new AppError("Email já cadastrado!", 400);
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    username,
    email,
    password: hashedPassword,
  });

  await userRepository.save(user);

  const newUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  
  return newUser;
};
export default userCreateService;
