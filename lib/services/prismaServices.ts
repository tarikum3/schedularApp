import prisma, { Product } from "@lib/prisma";
import { applyCollectionRules } from "@lib/services/utils";
interface FetchProductsOptions {
  searchKey?: string;
  filter?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

export async function fetchProducts(
  options: FetchProductsOptions
): Promise<{ products: Product[]; total: number }> {
  const { searchKey, filter, pagination } = options;

  try {
    // Build the query
    const whereClause: any = {};

    if (searchKey) {
      whereClause.name = { contains: searchKey, mode: "insensitive" };
    }

    if (filter) {
      if (filter.category) {
        whereClause.category = filter.category;
      }

      if (filter.minPrice !== undefined) {
        whereClause.price = { gte: filter.minPrice };
      }

      if (filter.maxPrice !== undefined) {
        whereClause.price = whereClause.price
          ? { ...whereClause.price, lte: filter.maxPrice }
          : { lte: filter.maxPrice };
      }
    }

    // Handle pagination
    let products: Product[];
    const total = await prisma.product.count({ where: whereClause });

    if (pagination) {
      const page = pagination.page ?? 1;
      const pageSize = pagination.pageSize ?? 10;
      const skip = (page - 1) * pageSize;
      const take = pageSize;

      products = await prisma.product.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      });
    } else {
      // If no pagination is provided, fetch all products
      products = await prisma.product.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
      });
    }

    return { products, total };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Unable to fetch products.");
  }
}

export async function fetchProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
  });
}

export async function createProduct(data: any) {
  return await prisma.product.create({ data });
}

export async function updateProduct(id: string, data: any) {
  return await prisma.product.update({
    where: { id },
    data,
  });
}

export async function deleteProduct(id: string) {
  return await prisma.product.delete({
    where: { id },
  });
}

// export async function fetchCollections() {
//   return await prisma.collection.findMany({
//     include: {
//       products: true,
//       rules: true,
//     },
//   });
// }

// export async function fetchCollectionById(id: string) {
//   return await prisma.collection.findUnique({
//     where: { id },
//     include: {
//       products: true,
//       rules: true,
//     },
//   });
// }

// export async function createCollection(data: any) {
//   return await prisma.collection.create({ data });
// }

// export async function updateCollection(id: string, data: any) {
//   return await prisma.collection.update({
//     where: { id },
//     data,
//   });
// }

// export async function deleteCollection(id: string) {
//   return await prisma.collection.delete({
//     where: { id },
//   });
// }

export async function fetchCart(userId: string) {
  return await prisma.cart.findMany({
    where: { userId },
    include: {
      items: true,
    },
  });
}
export async function getCart(cartId: string) {
  return await prisma.cart.findUnique({
    where: { id: cartId },
    include: { items: { include: { product: true } } },
  });
}
export async function createCart(data: any) {
  return await prisma.cart.create({ data });
}

export async function updateCart(id: string, data: any) {
  return await prisma.cart.update({
    where: { id },
    data,
  });
}

export async function deleteCart(id: string) {
  return await prisma.cart.delete({
    where: { id },
  });
}
export async function addItemToCart(
  cartId: string,
  productId: string,
  quantity: number
) {
  return await prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity,
    },
  });
}

export async function removeCartItem(cartId: string, productId: string) {
  return await prisma.cartItem.deleteMany({
    where: {
      cartId,
      productId,
    },
  });
}

export async function fetchCollections() {
  return await prisma.collection.findMany({
    include: {
      products: { include: { product: true } },
      rules: true,
    },
  });
}

interface CreateCollectionData {
  title: string;
  description?: string;
  rules: { field: string; condition: string; value: string }[];
}

export async function createCollection(data: CreateCollectionData) {
  const collection = await prisma.collection.create({
    data: {
      title: data.title,
      description: data.description,
      rules: {
        create: data.rules,
      },
    },
    include: {
      rules: true,
    },
  });

  await applyCollectionRules(collection.id);

  return collection;
}

export async function updateCollection(
  id: string,
  data: Partial<CreateCollectionData>
) {
  const collection = await prisma.collection.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      rules: {
        deleteMany: {},
        create: data.rules,
      },
    },
    include: {
      rules: true,
    },
  });

  await applyCollectionRules(collection.id);

  return collection;
}

export async function addProductToCollection(
  collectionId: string,
  productId: string
) {
  return await prisma.productCollection.create({
    data: {
      collectionId,
      productId,
    },
  });
}

export async function removeProductFromCollection(
  collectionId: string,
  productId: string
) {
  return await prisma.productCollection.deleteMany({
    where: {
      collectionId,
      productId,
    },
  });
}
