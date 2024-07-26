import prisma from "@lib/prisma";

export type Product = {
  id: string;
  name: string;
  description: string;
  descriptionHtml: string | null;
  sku: string | null;
  slug: string | null;
  path: string | null;
  vendor: string | null;
  tags: string[];
  createdAt: Date;
};
interface Rule {
  field: string;
  condition: string;
  value: string;
}
export type ProductFields = keyof Product;
function isValidField(field: string): field is ProductFields {
  return [
    "name",
    "description",
    "descriptionHtml",
    "sku",
    "slug",
    "path",
    "vendor",
    "tags",
  ].includes(field);
}
export async function applyCollectionRules(collectionId: string) {
  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
    include: { rules: true },
  });

  if (!collection) {
    throw new Error("Collection not found");
  }

  const products = await prisma.product.findMany();

  const matchingProducts = products.filter((product) => {
    return collection.rules.every((rule) => {
      if (!isValidField(rule.field)) {
        console.warn(`Field ${rule.field} is not valid on the product.`);
        return false;
      }

      const fieldValue = product[rule.field];
      if (typeof fieldValue != "string") {
        return false;
      }

      switch (rule.condition) {
        case "equals":
          return fieldValue === rule.value;
        case "contains":
          return fieldValue?.includes(rule.value);
        case "startsWith":
          return fieldValue?.startsWith(rule.value);
        case "endsWith":
          return fieldValue?.endsWith(rule.value);
        default:
          return false;
      }
    });
  });

  await prisma.productCollection.deleteMany({
    where: { collectionId },
  });

  await prisma.productCollection.createMany({
    data: matchingProducts.map((product) => ({
      productId: product.id,
      collectionId,
    })),
  });
}
