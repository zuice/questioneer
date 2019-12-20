import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { hash } from 'bcryptjs';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  readonly id: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  password: string;

  @Column({ default: 0 })
  @Field({ defaultValue: 0 })
  tokenVersion: number;

  @Column({ default: 0 })
  role: 'ADMIN' | 'NORMAL';

  @Column({ type: 'timestamptz', default: `Now()` })
  @Field()
  createdAt: Date;

  @Column({ type: 'timestamptz', default: `Now()`, update: true })
  @Field()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }

  @BeforeInsert()
  async checkFirst() {
    const count = await User.count();

    if (count === 0) {
      this.role = 'ADMIN';
    }
  }
}
