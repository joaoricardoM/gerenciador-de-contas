import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { AccountsModule } from '../accounts/accounts.module';  // Importe AccountsModule
import { UploadModule  } from 'src/uploadImage/uploadImage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), AccountsModule, UploadModule ],  // Adicione AccountsModule aqui
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
