import {
  Controller,
  Get,
  Post,
  Render,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from '../shared/helper';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('file-upload')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
  )
  uploadfile(@UploadedFiles() files): string {
    return 'success';
  }
  @Get()
  @Render('index')
  root() {
    return {};
  }
}
