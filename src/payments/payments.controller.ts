import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './payment.entity';
import { TransactionReportDto } from './dto/transaction-report.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/uploadImage/uploadImage';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly uploadService: UploadService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPaymentDto: CreatePaymentDto,
    @Request() req
  ): Promise<Payment> {
    let imageUrl = '';
    if (file) {
      imageUrl = await this.uploadService.uploadFile(file);
    }
    return this.paymentsService.create(createPaymentDto, imageUrl);
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.uploadService.uploadFile(file);
    return { imageUrl };
  }

  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Post('report')
  async generateReport(@Body() transactionReportDto: TransactionReportDto): Promise<{ payments: Payment[], total: number }> {
    return this.paymentsService.generateReport(transactionReportDto);
  }
}
