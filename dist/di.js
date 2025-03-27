"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
//di.ts
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const channel_1 = require("./entity/channel");
const message_1 = require("./entity/message");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Raaj@1818",
    database: "fastify_db",
    synchronize: true,
    logging: true,
    entities: [user_1.User, channel_1.Channel, message_1.Message],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected & tables created!");
})
    .catch((error) => {
    console.error(" Error connecting to database:", error);
});
