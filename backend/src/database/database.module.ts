import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Entry } from 'src/entries/entities/entry.entity';
import { Media } from 'src/media/entities/media.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nestjournal',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
