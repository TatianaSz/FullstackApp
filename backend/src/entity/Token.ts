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
export class UserToken extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({
    type: "bytea",
    nullable: true,
  })
  token: Buffer;

  @Column()
  expireAt: Date = new Date(new Date().setHours(new Date().getHours() + 23));

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.token)
  @JoinColumn()
  user: User;
}
