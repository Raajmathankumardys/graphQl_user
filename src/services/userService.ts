//userService.ts
import { Repository } from "typeorm";
import { User } from "../entity/user";
import bcrypt from "bcrypt";

export class UserServiceClass {
  private userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }
  async getUserById(userId: string) {
    return await this.userRepository.findOne({ where: { id: Number(userId) } });
  }
  async registerUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ name, email, password: hashedPassword });
    return this.userRepository.save(newUser);
  }
}
