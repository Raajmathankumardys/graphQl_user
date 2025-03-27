//channelResolvers.ts
export const channelResolvers = {
    Mutation: {
      createChannel: async (_: any, { name }: any, { channelService }: any) =>
        channelService.createChannel(name),
    },
    Query: {
      getAllChannels: (_: any, __: any, { channelService }: any) =>
        channelService.getAllChannels(),
    },
  };
  