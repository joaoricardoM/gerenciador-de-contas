import { IsNotEmpty, IsNumber, IsDateString, IsString, IsPositive, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  accountId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  value: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
