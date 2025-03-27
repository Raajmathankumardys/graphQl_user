//userMapper.ts
import { User } from "../entity/user";
import { UserModel } from "../models/userModel";

export function mapUserToModel(user: User): UserModel {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    status: user.status,
  };
}