//userService.ts
import { Repository } from "typeorm";
import { User } from "../entity/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export class UserServiceClass {
  private userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }
  async getUserById(userId: string) {
    return await this.userRepository.findOne({ where: { id: Number(userId) } });
  }
  async registerUser(name: string, email: string, password: string) {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
  
    if (existingUser) {
      throw new Error("A user with this email already exists.");
    }
  console.log('User not found, creating new user...');
    // Hash and save if not found
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ name, email, password: hashedPassword });
    return this.userRepository.save(newUser);
  }
  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    // Create token
    const token = jwt.sign(
      { userId: user.id, role: 'user' }, // assuming 'role' exists on User
      process.env.JWT_SECRET || "qwertyuiop", // Use a more secure secret in production
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
  
}
