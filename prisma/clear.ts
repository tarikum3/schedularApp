
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
//import {prisma} from "./seed"
async function clearData() {
  try {
    console.log("Starting to clear database...");

    // Clear product variants first
    await prisma.productVariant.deleteMany();
    console.log("Product variants cleared.");

    // Clear product option values
    await prisma.productOptionValue.deleteMany();
    console.log("Product option values cleared.");

    // Clear product options
    await prisma.productOption.deleteMany();
    console.log("Product options cleared.");

    // Clear product prices (if applicable)
    await prisma.productPrice.deleteMany();
    console.log("Product prices cleared.");

    // Clear product images
    await prisma.image.deleteMany();
    console.log("Product images cleared.");

    // Clear products
    await prisma.product.deleteMany();
    console.log("Products cleared.");

    console.log("Database cleared successfully!");
  } catch (error) {
    console.error("Error clearing database:", error);
  } finally {
    await prisma.$disconnect();
    console.log("Database connection closed.");
  }
}

clearData();
