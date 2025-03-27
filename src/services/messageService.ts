//messageService.ts
import { Repository } from "typeorm";
import { Message } from "../entity/message";

export class MessageService {
  private messageRepository: Repository<Message>;

  constructor(messageRepository: Repository<Message>) {
    this.messageRepository = messageRepository;
  }

  async sendMessage(userId: number, channelId: number, content: string) {
    const message = this.messageRepository.create({
      content,
      user: { id: userId },
      channel: { id: channelId },
    });
    await this.messageRepository.save(message);
    return message;
  }

  async getMessagesByChannel(channelId: number) {
    console.log('llllllllllllllllllllllllllllllllllllllllllllll');
    return this.messageRepository.find({
      where: { channel: { id: channelId } }, 
      relations: ["user", "channel"],
      order: { id: "ASC" },
    });
  }
}
