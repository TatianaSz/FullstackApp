import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Token extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  token: string;

  @Column()
  expireAt: Date = new Date(new Date().setHours(new Date().getHours() + 23));

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
