"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelService = void 0;
class ChannelService {
    constructor(channelRepository) {
        this.channelRepository = channelRepository;
    }
    async createChannel(name) {
        const channel = this.channelRepository.create({ name });
        return this.channelRepository.save(channel);
    }
    async getAllChannels() {
        return this.channelRepository.find({ relations: ["users", "messages"] });
    }
    async getChannelById(channelId) {
        return await this.channelRepository.findOne({ where: { id: Number(channelId) } });
    }
}
exports.ChannelService = ChannelService;
