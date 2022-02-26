import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Post {
  @Field(()=>Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  createdAt: Date = new Date(); 

  @Field()
  @Column()
  updatedAt: Date = new Date();

  @Field()
  @Column()
  name!: string;
}