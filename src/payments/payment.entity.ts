import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Column('decimal')
  value: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl: string;
}
