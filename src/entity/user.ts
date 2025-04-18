  //user.ts
  import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

  @Entity({ name: "users_table" })
  export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: true })
    status!: boolean;

    @Column({ default: 'user' }) // roles can be 'user', 'admin', etc.
    role!: string;

  }