import { Entry } from "src/entries/entities/entry.entity";
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export class Tag {
    @PrimaryGeneratedColumn()
    tagID: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(type => Entry)
    @JoinTable()
    entries: Entry[];
}
