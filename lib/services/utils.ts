import prisma, { Product, Collection } from "@lib/prisma";

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
    // "descriptionHtml",
    "sku",
    "slug",
    //"path",
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

  const matchingProducts = products.filter((product: any) => {
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
