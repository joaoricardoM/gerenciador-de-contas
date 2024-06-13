import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  accountType: string;

  @Column('decimal')
  initialBalance: number;
}
