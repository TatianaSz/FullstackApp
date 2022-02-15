import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {

  @PrimaryKey()
  id!: number; 

  @Property()
  title!: string;

  @Property()
  createDate = new Date();

  @Property({onUpdate: () => new Date()})
  updateDate = new Date();

}