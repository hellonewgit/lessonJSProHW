import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1702414500000 implements MigrationInterface {
    name = 'CreateTables1702414500000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Удаляем существующие таблицы, если они есть
        await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "task" CASCADE`);

        // Создаем таблицы заново
        await queryRunner.query(`
            CREATE TABLE "task" (
                "id_list" SERIAL PRIMARY KEY,
                "title" varchar NOT NULL,
                "description" varchar NOT NULL,
                "difficulty" varchar NOT NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "users" (
                "userid" SERIAL PRIMARY KEY,
                "username" varchar NOT NULL UNIQUE,
                "password" varchar NOT NULL,
                "role" varchar NOT NULL DEFAULT 'user',
                "task_id" integer,
                CONSTRAINT "FK_task_user" FOREIGN KEY ("task_id") REFERENCES "task"("id_list") ON DELETE SET NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "task" CASCADE`);
    }
}
