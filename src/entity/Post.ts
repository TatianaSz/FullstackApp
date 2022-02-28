import { Field, ID,  ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  createdAt: Date = new Date(); 

  @Field()
  @Column()
  updatedAt: Date = new Date();

  @Field(() => String)
  @Column()
  name!: string;
}
