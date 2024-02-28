import { MigrationInterface, QueryRunner } from "typeorm";

export class NewEntryEntity1709012126431 implements MigrationInterface {
    name = 'NewEntryEntity1709012126431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "address" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "packages" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "packages" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "salon" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "salon" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "services" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "services" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "salon" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "salon" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "packages" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "packages" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "created_at"`);
    }

}
