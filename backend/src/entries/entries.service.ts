import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>
  ) {}

  /**
   * Adds an entry to the database.
   * 
   * @param createEntryDto The data for the new entry.
   * @returns A promise that resolves to an entry.
   */
  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    const createdEntry = this.entriesRepository.create(createEntryDto);
    return await this.entriesRepository.save(createdEntry);
  }
}

