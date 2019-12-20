import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertQuestionTopic1576723635284 implements MigrationInterface {
  topics = ['Accounting', 'Financing', 'Economics'];
  public async up(queryRunner: QueryRunner): Promise<any> {
    this.topics.forEach(topic => {
      queryRunner.query(`INSERT INTO "question_topic"("title") VALUES ($1)`, [
        topic,
      ]);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    this.topics.forEach(topic => {
      queryRunner.query(`DELETE FROM "question_topic" WHERE title=$1`, [topic]);
    });
  }
}
