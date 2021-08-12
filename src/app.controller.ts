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
import { HandleDocx } from '../shared/handleDocx';
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
    HandleDocx.extractDocx('./uploads/test.docx').then(value => {
			console.log(value);
		} );
    return 'success';
  }

  @Get()
  @Render('index')
  root() {
    return {};
  }
}
