import { MigrationInterface, QueryRunner } from "typeorm";

export class NewEntryEntity1709106767862 implements MigrationInterface {
    name = 'NewEntryEntity1709106767862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD "last_name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD "name" character varying NOT NULL`);
    }

}
