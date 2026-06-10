import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const categories = [
    'Headphones',
    'Computers & Laptop',
    'smart phones',
    'Perfume',
    "Men's Kurta",
    "Women's Lehenga",
  ];

  await prisma.category.createMany({
    data: categories as any,
  });
}

main()
  .catch((e) => {
    console.error('Seeder Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
