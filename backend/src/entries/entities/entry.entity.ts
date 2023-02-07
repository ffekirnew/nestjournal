import { Column, CreateDateColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Category } from "src/categories/entities/category.entity";
import { Media } from "src/media/entities/media.entity";
import { Tag } from "src/tags/entities/tag.entity";


export class Entry {
    @PrimaryGeneratedColumn()
    entrieID: number;

    @CreateDateColumn()
    dateCreated: Date;

    @UpdateDateColumn()
    dateUpdated: Date;

    @Column()
    text: string;
    
    @ManyToOne(type => Category, category => category.entries)
    category: Category;
    
    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];
    
    @OneToMany(() => Media, (media) => media.entry)
    media: Media[];
    
    constructor(partial: Partial<Entry>) {
        Object.assign(this, partial);
    }
}
