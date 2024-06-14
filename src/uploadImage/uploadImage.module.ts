// src/uploadImage/uploadImage.module.ts
import { Module } from '@nestjs/common';
import { UploadService } from './uploadImage';

@Module({
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
