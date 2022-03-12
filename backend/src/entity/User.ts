import { Field, ID,  ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity{
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
  @Column({unique:true})
  username!: string;

  @Field(() => String)
  @Column({unique:true})
  email!: string;

 

  @Column()
  password!: string;
}
