"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
class MessageService {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async sendMessage(userId, channelId, content) {
        const message = this.messageRepository.create({
            content,
            user: { id: userId },
            channel: { id: channelId },
        });
        await this.messageRepository.save(message);
        return message;
    }
    async getMessagesByChannel(channelId) {
        console.log('llllllllllllllllllllllllllllllllllllllllllllll');
        return this.messageRepository.find({
            where: { channel: { id: channelId } },
            relations: ["user", "channel"],
            order: { id: "ASC" },
        });
    }
}
exports.MessageService = MessageService;
