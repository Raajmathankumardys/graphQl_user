//di.ts
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { config } from "dotenv";

import { Channel } from "./entity/channel";
import { Message } from "./entity/message";
config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  logging: process.env.DB_LOGGING === "true",
  entities: [User, Channel, Message],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected & tables created!");
  })
  .catch((error) => {
    console.error(" Error connecting to database:", error);
  });
