import {
  PrismaClient,
  Prisma,
  Product as PrismaProduct,
  Collection as PrismaCollection,
} from "@prisma/client";
type UserFullType = Prisma.ProductGetPayload<{
  include: {
    price: true;
  };
}>;
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
//export type Product = PrismaProduct;
export type Product = Prisma.ProductGetPayload<{
  include: {
    images: true;
    variants: true;
    price: true;
    options: true;
  };
}>;
export type Collection = PrismaCollection;
