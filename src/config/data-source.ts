import { DataSource } from "typeorm";
import { Users } from "../db/entities/users.entity.js";
import { Task } from "../db/entities/task.entity.js";
import "reflect-metadata";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "postgres",
    synchronize: false,
    logging: true,
    entities: [Users, Task],
    migrations: ["./src/db/migrations/*.ts"],
    subscribers: [],
});

export default AppDataSource;