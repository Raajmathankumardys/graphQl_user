import Fastify from "fastify";
import mercurius from "mercurius";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { userResolvers } from "./src/resolvers/userResolvers";
import { channelResolvers } from "./src/resolvers/channel";
import { messageResolvers } from "./src/resolvers/message";
import { UserServiceClass } from "./src/services/userService";
import { ChannelService } from "./src/services/channelService";
import { MessageService } from "./src/services/messageService";
import { AppDataSource } from "./src/di";
import { PubSub } from "graphql-subscriptions";
import { verifyToken } from "./src/auth/auth"; // Create this file

const fastify = Fastify();
const pubsub = new PubSub(); //  Initialize PubSub

//  Load GraphQL Schema
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "src/schemas"), { extensions: ["graphql"] })
);

//  Initialize Services
const userService = new UserServiceClass(AppDataSource.getRepository("User"));
const channelService = new ChannelService(AppDataSource.getRepository("Channel"));
const messageService = new MessageService(AppDataSource.getRepository("Message"));

//  Define Schema with Resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: { 
      ...channelResolvers.Query, 
      ...messageResolvers.Query 
    },
    Mutation: { 
      ...userResolvers.Mutation, 
      ...channelResolvers.Mutation, 
      ...messageResolvers.Mutation 
    },
    Subscription: {
      ...messageResolvers.Subscription
    }
  }
});

// Register Fastify GraphQL Plugin (Mercurius)
fastify.register(mercurius, {
  schema,
  context: async (req, reply) => {
    const body = req.body as { query?: string }; // <- Fix here
  console.log("Request body:", body); // Log the request body for debugging
    const publicOps = ["registerUser", "loginUser"];
    const isPublic = publicOps.some(op => body.query?.includes(op));
  console.log("Is public operation:", isPublic); // Log the operation type for debugging
    let user = null;
    if (!isPublic) {
      try {
        user = verifyToken(req);
      } catch (err) {
        reply.code(401);
        throw new Error("Unauthorized: Invalid or missing token");
      }
    }
  
    return {
      user,
      pubsub,
      userService,
      channelService,
      messageService
    };
  },
  
  subscription: true,
  graphiql: true // Enable GraphiQL Web UI
});

//  Enable WebSocket Support........
//fastify.register(fastifyWebsocket);

async function startServer() {
  const PORT = 4003;
  
  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(` GraphQL API ready at http://localhost:${PORT}/graphql`);
    console.log(` WebSocket running on ws://localhost:${PORT}/graphql`);
  } catch (err) {
    console.error(" Server error:", err);
    process.exit(1);
  }
}

startServer();
