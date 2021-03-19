import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const userIsAdmin = this.usersRepository.findById(user_id);

    if (!userIsAdmin) throw new Error("User dont exists");

    if (userIsAdmin.admin === true) throw new Error("User is already admin!");

    const user = this.usersRepository.turnAdmin(userIsAdmin);

    return user;
  }
}

export { TurnUserAdminUseCase };
