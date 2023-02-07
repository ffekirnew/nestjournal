import { Entry } from 'src/entries/entities/entry.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  type: string;

  @ManyToOne(type => Entry, entry => entry.media)
  entry: Entry;

  constructor(partial: Partial<Media>) {
    Object.assign(this, partial);
  }
}