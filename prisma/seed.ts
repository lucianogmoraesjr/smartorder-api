import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  const [pizzas, bebidas] = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Pizzas',
        emoji: '🍕',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Bebidas',
        emoji: '🍻',
      },
    }),
  ]);

  const [mussarela, parmesao, provolone, gorgonzola] = await Promise.all([
    prisma.ingredient.create({
      data: {
        name: 'Mussarela',
        emoji: '🧀',
      },
    }),
    prisma.ingredient.create({
      data: {
        name: 'Parmesão',
        emoji: '🧀',
      },
    }),
    prisma.ingredient.create({
      data: {
        name: 'Provolone',
        emoji: '🧀',
      },
    }),
    prisma.ingredient.create({
      data: {
        name: 'Gorgonzola',
        emoji: '🧀',
      },
    }),
  ]);

  const [quatroQueijos, cocaCola] = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Quatro queijos',
        description: 'Deliciosa pizza sabor quatro queijos',
        priceInCents: 4500,
        imagePath: 'quatro-queijos.png',
        categoryId: pizzas.id,
        ingredients: {
          create: [
            {
              ingredient: {
                connect: {
                  id: mussarela.id,
                },
              },
            },
            {
              ingredient: {
                connect: {
                  id: parmesao.id,
                },
              },
            },
            {
              ingredient: {
                connect: {
                  id: provolone.id,
                },
              },
            },
            {
              ingredient: {
                connect: {
                  id: gorgonzola.id,
                },
              },
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Coca-Cola',
        description: 'Coquinha geladinha topzera',
        priceInCents: 700,
        imagePath: 'coca-cola.png',
        categoryId: bebidas.id,
      },
    }),
  ]);

  await prisma.order.create({
    data: {
      table: 1,
      products: {
        create: [
          {
            quantity: 1,
            product: {
              connect: {
                id: quatroQueijos.id,
              },
            },
          },
          {
            quantity: 2,
            product: {
              connect: {
                id: cocaCola.id,
              },
            },
          },
        ],
      },
    },
  });
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
