import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Question } from './Question';
import { Lazy } from '../lib/Lazy';

@Entity()
@ObjectType()
export class QuestionDifficulty extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  title: string;

  @OneToMany(
    () => Question,
    question => question.difficultyId,
    {
      cascade: true,
    },
  )
  @Field(() => [Question])
  questions: Lazy<Question[]>;
}
