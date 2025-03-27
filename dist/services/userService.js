"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceClass = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserServiceClass {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUserById(userId) {
        return await this.userRepository.findOne({ where: { id: Number(userId) } });
    }
    async registerUser(name, email, password) {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = this.userRepository.create({ name, email, password: hashedPassword });
        return this.userRepository.save(newUser);
    }
}
exports.UserServiceClass = UserServiceClass;
