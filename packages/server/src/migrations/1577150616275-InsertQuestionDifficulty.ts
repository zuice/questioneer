import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertQuestionDifficulty1577150616275
  implements MigrationInterface {
  difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  public async up(queryRunner: QueryRunner): Promise<any> {
    this.difficulties.forEach(difficulty => {
      queryRunner.query(
        `INSERT INTO "question_difficulty"("title") VALUES ($1)`,
        [difficulty],
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    this.difficulties.forEach(difficulty => {
      queryRunner.query(`DELETE FROM "question_difficulty" WHERE title=$1`, [
        difficulty,
      ]);
    });
  }
}
