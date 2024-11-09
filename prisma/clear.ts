// clear.ts
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

//npm run prisma-clear
async function clearData() {
  try {
    // Clear product variants
    await prisma.productVariant.deleteMany();

    // Clear product options and option values
    await prisma.productOptionValue.deleteMany();
    await prisma.productOption.deleteMany();

    // Clear products
    await prisma.product.deleteMany();

    console.log("Database cleared successfully!");
  } catch (error) {
    console.error("Error clearing database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearData();
