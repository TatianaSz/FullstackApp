import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  createdAt: Date = new Date(); 

  @Column()
  updatedAt: Date = new Date();

  @Column()
  name!: string;
}