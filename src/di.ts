//di.ts
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { Channel } from "./entity/channel";
import { Message } from "./entity/message";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Raaj@1818",
  database: "fastify_db",
  synchronize: true,
  logging: true,
  entities: [User, Channel, Message],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected & tables created!");
  })
  .catch((error) => {
    console.error(" Error connecting to database:", error);
  });
