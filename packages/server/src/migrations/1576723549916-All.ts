import { MigrationInterface, QueryRunner } from 'typeorm';

export class All1576723549916 implements MigrationInterface {
  name = 'All1576723549916';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "question_difficulty" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_2859893a6657c9e8843674013fd" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "question_topic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_39d305cac1df890f9724157e2e4" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "body" character varying NOT NULL, "tag" character varying, "slug" character varying NOT NULL, "preview" character varying NOT NULL, "difficultyId" uuid NOT NULL, "topicId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "tokenVersion" integer NOT NULL DEFAULT 0, "role" character varying NOT NULL DEFAULT 0, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'Now()', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'Now()', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_ab262787dcf7e34d925bb63bed1" FOREIGN KEY ("difficultyId") REFERENCES "question_difficulty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_9c94ad4e743815401ff57f89833" FOREIGN KEY ("topicId") REFERENCES "question_topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_9c94ad4e743815401ff57f89833"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_ab262787dcf7e34d925bb63bed1"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TABLE "question"`, undefined);
    await queryRunner.query(`DROP TABLE "question_topic"`, undefined);
    await queryRunner.query(`DROP TABLE "question_difficulty"`, undefined);
  }
}
