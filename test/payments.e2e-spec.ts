import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('PaymentsController (e2e)', () => {
  let app: INestApplication;
  let accountId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Criar uma conta para ser usada nos testes de pagamentos
    const accountResponse = await request(app.getHttpServer())
      .post('/accounts')
      .send({
        name: "Test Account",
        accountType: "corrente",
        initialBalance: 1000.0,
      });
    accountId = accountResponse.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/payments (POST)', async () => {
    return request(app.getHttpServer())
      .post('/payments')
      .send({
        accountId: accountId,
        value: 100.0,
        date: "2024-06-10T12:00:00Z",
        description: "Payment description"
      })
      .expect(201);
  });

  it('/payments (GET)', async () => {
    return request(app.getHttpServer())
      .get('/payments')
      .expect(200);
  });
});
