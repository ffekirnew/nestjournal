import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('media')
export class MediaController {

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
    storage: diskStorage({
      destination: '../../public/media',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      },
    }),
  })
  )
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
    return { file };
  }
}