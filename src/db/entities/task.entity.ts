import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity.js";

@Entity("task")
export class Task {
  @PrimaryGeneratedColumn()
  id_list!: number;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "varchar" })
  description!: string;

  @Column({ type: "varchar" })
  difficulty!: string;

  @OneToMany(() => Users, (users) => users.task)
  users!: Users[];
}
