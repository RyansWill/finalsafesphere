import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

setInterval(async () => {
  try {
    // Replace 'track' with one of your actual model names from schema.prisma
    await prisma.$queryRaw`SELECT 1`; 
    console.log("Heartbeat: Database connection remains active.");
  } catch (err) {
    console.log("Heartbeat: Waking up database...");
  }
}, 300000); // 300,000ms = 5 minutes

export default prisma;


