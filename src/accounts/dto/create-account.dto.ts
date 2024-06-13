import { IsNotEmpty, IsString, IsNumber, Min, IsPositive } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  accountId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  accountType: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  initialBalance: number;
}
