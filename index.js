"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const mercurius_1 = __importDefault(require("mercurius"));
const schema_1 = require("@graphql-tools/schema");
const load_files_1 = require("@graphql-tools/load-files");
const path_1 = __importDefault(require("path"));
const merge_1 = require("@graphql-tools/merge");
const userResolvers_1 = require("./src/resolvers/userResolvers");
const channel_1 = require("./src/resolvers/channel");
const message_1 = require("./src/resolvers/message");
const userService_1 = require("./src/services/userService");
const channelService_1 = require("./src/services/channelService");
const messageService_1 = require("./src/services/messageService");
const di_1 = require("./src/di");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const fastify = (0, fastify_1.default)();
const pubsub = new graphql_subscriptions_1.PubSub(); //  Initialize PubSub
//  Load GraphQL Schema
const typeDefs = (0, merge_1.mergeTypeDefs)((0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, "src/schemas"), { extensions: ["graphql"] }));
//  Initialize Services
const userService = new userService_1.UserServiceClass(di_1.AppDataSource.getRepository("User"));
const channelService = new channelService_1.ChannelService(di_1.AppDataSource.getRepository("Channel"));
const messageService = new messageService_1.MessageService(di_1.AppDataSource.getRepository("Message"));
//  Define Schema with Resolvers
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs,
    resolvers: {
        Query: Object.assign(Object.assign({}, channel_1.channelResolvers.Query), message_1.messageResolvers.Query),
        Mutation: Object.assign(Object.assign(Object.assign({}, userResolvers_1.userResolvers.Mutation), channel_1.channelResolvers.Mutation), message_1.messageResolvers.Mutation),
        Subscription: Object.assign({}, message_1.messageResolvers.Subscription)
    }
});
// Register Fastify GraphQL Plugin (Mercurius)
fastify.register(mercurius_1.default, {
    schema,
    context: () => ({
        pubsub,
        userService,
        channelService,
        messageService
    }),
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
    }
    catch (err) {
        console.error(" Server error:", err);
        process.exit(1);
    }
}
startServer();
