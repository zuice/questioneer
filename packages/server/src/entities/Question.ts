import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import slugify from '@sindresorhus/slugify';

import { QuestionDifficulty } from './QuestionDifficulty';
import { QuestionTopic } from './QuestionTopic';
import { Lazy } from '../lib/Lazy';

@Entity()
@ObjectType()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  readonly id: string;

  @Column()
  @Field()
  body: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tag?: string;

  @Column()
  @Field()
  slug: string;

  @Column()
  @Field()
  preview: string;

  @Column('uuid')
  @Field(() => ID)
  difficultyId: string;

  @Column('uuid')
  @Field(() => ID)
  topicId: string;

  @ManyToOne(
    () => QuestionDifficulty,
    questionDifficulty => questionDifficulty.questions,
  )
  @Field(() => QuestionDifficulty)
  difficulty?: Lazy<QuestionDifficulty>;

  @ManyToOne(
    () => QuestionTopic,
    questionTopic => questionTopic.questions,
  )
  @Field(() => QuestionTopic)
  topic?: Lazy<QuestionDifficulty>;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @BeforeInsert()
  setSlug() {
    const slug = slugify(this.body.substring(0, 20));
    const randoms =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    this.slug = slugify(slug + randoms);
  }

  @BeforeInsert()
  setPreview() {
    const trimmed = this.body.substring(0, 200);
    const withoutSpecials = trimmed.replace(
      /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
      '',
    );
    const preview = `${withoutSpecials}...`;

    this.preview = preview;
  }
}
