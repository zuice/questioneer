import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import slugify from '@sindresorhus/slugify';
import sanitizeHtml from 'sanitize-html';

import { Question } from './Question';
import { Lazy } from '../lib/Lazy';

@Entity()
@ObjectType()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  readonly id: string;

  @Column({ type: 'text' })
  @Field()
  body: string;

  @Column()
  @Field()
  slug: string;

  @Column()
  @Field()
  preview: string;

  @Column('uuid')
  @Field(() => ID)
  userId: string;

  @Column('uuid')
  @Field(() => ID)
  questionId: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @ManyToOne(() => Question)
  @Field(() => Question)
  question: Lazy<Question>;

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
