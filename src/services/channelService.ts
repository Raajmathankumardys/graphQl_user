//channelService.ts
import { Repository } from "typeorm";
import { Channel } from "../entity/channel";

export class ChannelService {
  private channelRepository: Repository<Channel>;

  constructor(channelRepository: Repository<Channel>) {
    this.channelRepository = channelRepository;
  }

  async createChannel(name: string) {
    const channel = this.channelRepository.create({ name });
    return this.channelRepository.save(channel);
  }

  async getAllChannels() {
    return this.channelRepository.find({ relations: ["users", "messages"] });
  }
  async getChannelById(channelId: string) {
    return await this.channelRepository.findOne({ where: { id: Number(channelId) } });
  }
}
