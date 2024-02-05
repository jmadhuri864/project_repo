import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1706784760301 implements MigrationInterface {
    name = 'addedUserEntity1706784760301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c6c71bce0bd3f70fc754b8ab61d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_c6c71bce0bd3f70fc754b8ab61d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userProfileId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "userProfileId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_c6c71bce0bd3f70fc754b8ab61d" UNIQUE ("userProfileId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c6c71bce0bd3f70fc754b8ab61d" FOREIGN KEY ("userProfileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
