import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';

import { EntriesModule } from './entries/entries.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, EntriesModule, CategoriesModule, TagsModule, MediaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
