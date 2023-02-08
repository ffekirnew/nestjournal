import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  // constructor(
  //   @InjectRepository(Media)
  //   private readonly mediaRepository: Repository<Media>,
  // ) {}

  // /**
  //  * Adds a media into the database.
  //  * 
  //  * @param {Media} media the media to be stored in the database.
  //  * @returns {Promise<Media>} a promise that will resolve to a media url.
  //  */
  // async create(media: Media): Promise<Media> {
  //   return this.mediaRepository.save(media);
  // }
}
