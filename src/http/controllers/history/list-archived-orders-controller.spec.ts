import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaOrder } from 'test/factories/make-order';
import { makePrismaProduct } from 'test/factories/make-product';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { PrismaHistoryRepository } from '@/repositories/prisma/prisma-history-repository';
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { ArchiveOrderUseCase } from '@/use-cases/history/archive-order-use-case';

let prismaOrdersRepository: PrismaOrdersRepository;
let prismaHistoryRepository: PrismaHistoryRepository;
let archiveOrderUseCase: ArchiveOrderUseCase;

describe('List Archived Orders Controller (E2E)', () => {
  beforeEach(() => {
    prismaOrdersRepository = new PrismaOrdersRepository();
    prismaHistoryRepository = new PrismaHistoryRepository();
    archiveOrderUseCase = new ArchiveOrderUseCase(
      prismaOrdersRepository,
      prismaHistoryRepository,
    );
  });

  test('[GET] /history', async () => {
    const category = await makePrismaCategory({
      name: 'category-1',
    });

    const product = await makePrismaProduct({
      name: 'product-1',
      categoryId: category.id,
    });

    const order1 = await makePrismaOrder({
      products: [
        {
          productId: product.id,
          quantity: 2,
        },
      ],
    });

    await makePrismaOrder({
      products: [
        {
          productId: product.id,
          quantity: 1,
        },
      ],
    });

    await archiveOrderUseCase.execute(order1.id);

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .get('/history')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    );

    const orderOnDatabase = await prisma.order.findUnique({
      where: {
        id: order1.id,
      },
    });

    expect(orderOnDatabase).toEqual(
      expect.objectContaining({
        archivedAt: expect.any(Date),
      }),
    );

    const orders = await prisma.order.findMany();

    expect(orders).toHaveLength(2);
  });
});
