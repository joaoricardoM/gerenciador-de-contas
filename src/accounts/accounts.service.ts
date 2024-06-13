import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.accountsRepository.create(createAccountDto);
    return this.accountsRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return this.accountsRepository.find();
  }

  async findOne(id: number): Promise<Account> {
    return this.accountsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAccountDto: Partial<Account>): Promise<void> {
    await this.accountsRepository.update(id, updateAccountDto);
  }
}
