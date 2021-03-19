import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const userByID = this.users.find((user) => user.id === id);

    return userByID;
  }

  findByEmail(email: string): User | undefined {
    const userByEmail = this.users.find((user) => user.email === email);

    return userByEmail;
  }

  turnAdmin(receivedUser: User): User {
    const { email } = receivedUser;
    const user = this.findByEmail(email);

    if (!user) throw new Error("User dont exists!");

    user.admin = true;

    return user;
  }

  list(): User[] {
    const allUsers = this.users;

    return allUsers;
  }
}

export { UsersRepository };
