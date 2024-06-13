import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AccountsService } from '../accounts/accounts.service';
import { TransactionReportDto } from './dto/transaction-report.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private accountsService: AccountsService,
  ) { }

  async create(createPaymentDto: CreatePaymentDto, imageUrl: string): Promise<Payment> {
    const account = await this.accountsService.findOne(createPaymentDto.accountId);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.initialBalance < createPaymentDto.value) {
      throw new BadRequestException('Insufficient funds');
    }

    account.initialBalance -= createPaymentDto.value;
    await this.accountsService.update(account.id, { initialBalance: account.initialBalance });

    const payment = this.paymentsRepository.create({ ...createPaymentDto, imageUrl });
    return this.paymentsRepository.save(payment);

  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find();
  }

  async generateReport(transactionReportDto: TransactionReportDto): Promise<{ payments: Payment[], total: number }> {
    const { accountId, startDate, endDate } = transactionReportDto;

    const payments = await this.paymentsRepository.find({
      where: {
        accountId: accountId,
        date: Between(new Date(startDate), new Date(endDate))
      }
    });

    const total = payments.reduce((sum, payment) => sum + payment.value, 0);

    return { payments, total };
  }
}
