import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class TransactionReportDto {
  @IsNotEmpty()
  @IsNumber()
  accountId: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}
