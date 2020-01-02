import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import sanitizeHtml from 'sanitize-html';
import slugify from '@sindresorhus/slugify';

import { QuestionDifficulty } from './QuestionDifficulty';
import { QuestionTopic } from './QuestionTopic';
import { Answer } from './Answer';
import { Lazy } from '../lib/Lazy';
import { User } from './User';

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

  @Column('uuid')
  @Field(() => ID)
  userId: string;

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

  @OneToMany(
    () => Answer,
    answer => answer.questionId,
  )
  @Field(() => [Answer])
  answers?: Lazy<Answer[]>;

  @ManyToOne(() => User)
  @Field(() => User)
  user?: Lazy<User>;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @BeforeInsert()
  setBody() {
    const body = sanitizeHtml(this.body, {
      textFilter: function(text) {
        return text.replace(/\.\.\./, '&hellip;');
      },
    });

    this.body = body;
  }

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
