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

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('file'))
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

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.uploadService.uploadFile(file);
    return { imageUrl };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('report')
  async generateReport(@Body() transactionReportDto: TransactionReportDto): Promise<{ payments: Payment[], total: number }> {
    return this.paymentsService.generateReport(transactionReportDto);
  }
}
