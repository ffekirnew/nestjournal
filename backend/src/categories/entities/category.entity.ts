import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Entry } from "src/entries/entities/entry.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Entry, entry => entry.category)
  entries: Entry[];

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
