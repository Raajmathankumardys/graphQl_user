import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub(); // Initialize PubSub

// ✅ Ensure pubsub is passed via context, not defined here
export const messageResolvers = {
 Subscription: {
  messageAdded: {
    subscribe: async (_: any, args: { channelId: string }, context: any) => {
      console.log("Checking pubsub instance:", context.pubsub);
      
      if (!pubsub || typeof pubsub.asyncIterableIterator !== "function") {
        throw new Error("pubsub is not properly initialized.");
      }
      
      const topic = `MESSAGE_ADDED_${args.channelId}`;
      console.log(`Subscribing to topic: ${topic}`);
      
      return pubsub.asyncIterableIterator(topic);
    },
    
    resolve: (payload: any) => {
      console.log("Received message:", payload);
      return payload?.messageAdded || null;
    },
  },
},


  Mutation: {
    sendMessage: async (_: any, { userId, channelId, content }: any, context: any) => {
      if (!content || typeof content !== "string") {
        throw new Error("Message content must be a valid string.");
      }
    
      console.log("Sending message:", content);
      
      //  Validate User
      const user = await context.userService.getUserById(userId);
      if (!user) throw new Error(`User with ID ${userId} does not exist.`);
    
      //  Validate Channel
      const channel = await context.channelService.getChannelById(channelId);
      if (!channel) throw new Error(`Channel with ID ${channelId} does not exist.`);
    
      //  Send Message
      const message = await context.messageService.sendMessage(userId, channelId, content);
      if (!message) throw new Error("Message creation failed.");
    
      //  Publish Event
      const topic = `MESSAGE_ADDED_${channelId}`;
      console.log(`Publishing message to topic: ${topic}`);
      pubsub.publish(topic, { messageAdded: message });
    console.log("Sent message:", message);
      return message;
    },
    
  },

  Query: {
    getMessagesByChannel: (_: any, { channelId }: any, { messageService }: any) =>
      messageService.getMessagesByChannel(channelId),
  },
};
