import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/uploads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
          console.log(file);
        },
      }),
    }),
  )
  async uploadFile() {
    // console.log(file);
    return 'uploaded successfully.';
  }
}
