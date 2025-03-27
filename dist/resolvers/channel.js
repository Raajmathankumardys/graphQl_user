"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelResolvers = void 0;
//channelResolvers.ts
exports.channelResolvers = {
    Mutation: {
        createChannel: async (_, { name }, { channelService }) => channelService.createChannel(name),
    },
    Query: {
        getAllChannels: (_, __, { channelService }) => channelService.getAllChannels(),
    },
};
