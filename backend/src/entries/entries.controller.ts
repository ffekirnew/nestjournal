import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';

@Controller('entries')
export class EntriesController {
  constructor(private entriesService: EntriesService) {}

  // @Post()
  // async create(@Body() createEntryDto: CreateEntryDto): Promise<Entry> {
  //   return await this.entriesService.create(createEntryDto);
  // }
}

