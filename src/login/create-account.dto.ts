// create-account.dto.ts

import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';

enum AccountType {
  Corrente = 'corrente',
  Poupanca = 'poupanca',
}

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(AccountType)
  accountType: AccountType;

  @IsNotEmpty()
  @IsNumber()
  initialBalance: number;
}
