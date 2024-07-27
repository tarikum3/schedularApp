import prisma, { Product, Collection } from "@lib/prisma";
import { applyCollectionRules } from "@lib/services/utils";
import { supabase } from "@lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
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

const productData2 = {
  name: "Sample Product2",
  description: "A high-quality product2",
  descriptionHtml: "<p>A high-quality produc2t</p>",
  sku: "SKU123452",
  slug: "sample-product2",
  path: "/products/sample-product",
  // images: [
  //   { url: "https://example.com/image12.jpg" },
  //   { url: "https://example.com/image22.jpg" }
  // ],
  vendor: "Sample Vendor2",
  tags: ["tag12", "tag22"],
};
const productData = {
  name: "Sample Product",
  description: "A high-quality product",
  descriptionHtml: "<p>A high-quality product</p>",
  sku: "SKU12345",
  slug: "sample-product",
  path: "/products/sample-product",
  // images: [
  //   { url: "https://example.com/image1.jpg" },
  //   { url: "https://example.com/image2.jpg" }
  // ],
  vendor: "Sample Vendor",
  tags: ["tag1", "tag2"],
};
export async function fetchProducts(
  options: FetchProductsOptions
): Promise<{ products: Product[]; total: number }> {
  const { searchKey, filter, pagination } = options;

  try {
    // Build the query
    // const product = await createProduct(productData);
    // const product2 = await createProduct(productData2);
    // console.log("productpp", product);
    // console.log("productpp", product2);
    // const image = "t-shirt-1.png";
    // const imagePath = path.resolve("./public/assets", image);
    // console.log("imagePath", imagePath);
    // const imageBuffer = fs.readFileSync(imagePath);
    // const { data, error } = await supabase.storage
    //   .from("images")
    //   .upload(`public/${uuidv4()}-${image}`, imageBuffer);

    // if (error) {
    //   console.error("Error uploading image:", error);

    //   throw new Error("Error uploading image.");
    // }
    // console.log("imagePathdata", data);
    // const imageUrl = `${
    //   supabase.storage.from("images").getPublicUrl(data.path).data.publicUrl
    // }`;
    // console.log("imageUrlimageUrl", imageUrl);

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

// export async function createProduct(data: any) {
//   return await prisma.product.create({ data });
// }

export async function createProduct(data: any) {
  const { images, variants, price, options, ...productData } = data;

  try {
    const product = await prisma.product.create({
      data: {
        ...productData,
        images: images ? { create: images } : undefined,
        variants: variants ? { create: variants } : undefined,
        price: price ? { create: price } : undefined,
        options: options ? { create: options } : undefined,
      },
      include: {
        images: true,
        variants: true,
        price: true,
        options: true,
      },
    });

    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
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

interface FetchCollectionOptions {
  id?: string;
  title?: string;
}

export async function fetchCollection(
  options: FetchCollectionOptions
): Promise<(Collection & { products: Product[] }) | null> {
  const { id, title } = options;

  if (!id && !title) {
    throw new Error("Either id or title must be provided.");
  }

  try {
    const whereClause = id ? { id } : { title: title as string };

    const collection = await prisma.collection.findFirst({
      where: whereClause,
      include: {
        products: true,
      },
    });

    if (!collection) {
      throw new Error("Collection not found.");
    }

    return collection as any;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw new Error("Unable to fetch collection.");
  }
}
