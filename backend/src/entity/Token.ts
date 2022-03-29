import { ErrorObj } from "../resolvers/register/input";
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
  @Column({ nullable: true })
  token: string;

  @Column()
  expireAt: Date = new Date(new Date().setHours(new Date().getHours() + 23));

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.token)
  @JoinColumn()
  user: User;
}

@ObjectType()
export class TokenValidationResponse {
  @Field(() => UserToken, { nullable: true })
  token?: UserToken;

  @Field(() => [ErrorObj], { nullable: true })
  errorArr?: ErrorObj[];
}
