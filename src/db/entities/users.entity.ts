import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn()
  userid!: number;

  @Column({ name: "username", type: "varchar", unique: true })
  username!: string;

  @Column({ name: "password", type: "varchar" })
  password!: string;

  @Column({ name: "role", type: "varchar", default: "user" })
  role!: string;
}
