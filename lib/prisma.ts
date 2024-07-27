import {
  PrismaClient,
  Product as PrismaProduct,
  Collection as PrismaCollection,
} from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;

export type Product = PrismaProduct;
export type Collection = PrismaCollection;
