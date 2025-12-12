// libs/db/seed.cjs
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();

  // Create one demo project
  const project = await prisma.project.create({
    data: {
      name: 'Prisma + Nx Fullstack Lab',
      status: 'ACTIVE',
    },
  });

  // Create a couple of tasks under that project
  await prisma.task.createMany({
    data: [
      {
        projectId: project.id,
        title: 'Wire Prisma into Express',
        completed: true,
      },
      {
        projectId: project.id,
        title: 'Call DB through libs/db',
        completed: false,
      },
    ],
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
