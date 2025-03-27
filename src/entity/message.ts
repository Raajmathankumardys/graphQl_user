//messageEntities.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { Channel } from "./channel";

@Entity({ name: "messages" })
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Channel)
  channel!: Channel;
}
