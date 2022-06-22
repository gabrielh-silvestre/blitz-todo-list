import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const firstUserId = 'cl4q28dge00013a82yht5klxn';
  const secondUserId = 'cl4q28mt300033a82oq6te0u8';
  const thirdUserId = 'cl4q28r7000053a82kkqujqsp';

  await prisma.task.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.createMany({
    data: [
      {
        id: firstUserId,
        name: 'John',
        email: 'john@email.com',
        password: await hash('123456'),
      },
      {
        id: secondUserId,
        name: 'Jane',
        email: 'jane@email.com',
        password: await hash('123456'),
      },
      {
        id: thirdUserId,
        name: 'Jack',
        email: 'jack@email.com',
        password: await hash('123456'),
      },
    ],
  });

  const firstMainTaskId = 'cl4q28wy400073a82ix9h5bmy';
  const secondMainTaskId = 'cl4q299ve00093a82o9pco4fy';

  await prisma.task.createMany({
    data: [
      {
        id: firstMainTaskId,
        title: 'Go to the store',
        description: null,
        userId: firstUserId,
      },
      {
        title: 'Buy milk',
        description: 'Chocolate milk',
        userId: firstUserId,
        mainTaskId: firstMainTaskId,
      },
      {
        title: 'Buy eggs',
        description: 'Eggs for breakfast',
        userId: firstUserId,
        mainTaskId: firstMainTaskId,
      },
      {
        title: 'Buy bread',
        description: 'Integral bread',
        userId: firstUserId,
        mainTaskId: firstMainTaskId,
      },
      {
        id: secondMainTaskId,
        title: 'Study',
        description: 'Learn Elixir',
        userId: secondUserId,
      },
      {
        title: 'Read documentation',
        description: null,
        userId: secondUserId,
        mainTaskId: secondMainTaskId,
      },
      {
        title: 'Practice in CodeWars',
        description: 'Solve 3 problems',
        userId: secondUserId,
        mainTaskId: secondMainTaskId,
      },
      {
        title: 'Rest for the exam',
        description: null,
        userId: thirdUserId,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
