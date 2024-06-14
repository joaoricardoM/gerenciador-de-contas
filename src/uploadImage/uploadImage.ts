import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadService {
  uploadFile(file): string {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = extname(file.originalname);
    const filename = `${uniqueSuffix}${ext}`;
    const imageUrl = `http://localhost:3000/uploads/${filename}`;
    return imageUrl;
  }
}
