import prisma, { Product, Collection } from "@lib/prisma";
import { applyCollectionRules } from "@lib/services/utils";
import { supabase } from "@lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";

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
  sort?: {
    field: "name" | "createdAt" | "price";
    order: "asc" | "desc";
  };
}
const productData = {
  name: "White T-shirt",
  description: "A comfortable and stylish white T-shirt.",
  //descriptionHtml: "<p>A comfortable and stylish white T-shirt.</p>",
  sku: "TSHIRT-White",
  category: "Top",
  //slug: "white-t-shirt",
  //path: "/white-t-shirt",
  //vendor: "Fashion Co.",
  tags: ["clothing", "t-shirt", "white", "women"],
  images: [
    {
      url: "https://qvkdnhfbjppmzromhdae.supabase.co/storage/v1/object/public/images/public/t-shirt-3.png",
    },
    // { url: "https://example.com/images/white-tshirt-back.jpg" },
  ],
  variants: [
    {
      name: "White T-shirt - Small",
      // sku: "TSHIRT-White-S",
      price: 19.99,
      quantity: 2,
    },
    {
      name: "White T-shirt - Medium",
      //sku: "TSHIRT-White-M",
      price: 19.99,
      quantity: 3,
    },
    {
      name: "White T-shirt - Large",
      //sku: "TSHIRT-White-L",
      price: 19.99,
      quantity: 1,
    },
  ],
  price: {
    amount: 19.99,
    currency: "ETB",
  },
  options: [{ name: "Size", values: ["S", "M", "L"] }],
};
const productData2 = {
  name: "Black T-shirt",
  description: "A comfortable and stylish black T-shirt.",
  //descriptionHtml: "<p>A comfortable and stylish black T-shirt.</p>",
  sku: "TSHIRT-black",
  category: "Top",
  //slug: "black-t-shirt",
  //path: "/black-t-shirt",
  //vendor: "Fashion Co.",
  tags: ["clothing", "t-shirt", "black", "men"],
  images: [
    {
      url: "https://qvkdnhfbjppmzromhdae.supabase.co/storage/v1/object/public/images/public/0d6ae87c-5049-4a31-a279-55f4bad71e5e-t-shirt-1.png",
    },
    // { url: "https://example.com/images/black-tshirt-back.jpg" },
  ],
  variants: [
    {
      name: "Black T-shirt - Small",
      // sku: "TSHIRT-Black-S",
      price: 19.99,
      quantity: 2,
    },
    {
      name: "Black T-shirt - Medium",
      // sku: "TSHIRT-Black-M",
      price: 19.99,
      quantity: 3,
    },
    {
      name: "Black T-shirt - Large",
      // sku: "TSHIRT-Black-L",
      price: 19.99,
      quantity: 1,
    },
  ],
  price: {
    amount: 19.99,
    currency: "ETB",
  },
  options: [{ name: "Size", values: ["S", "M", "L"] }],
};

export async function fetchProducts(
  options: FetchProductsOptions
): Promise<{ products: Product[]; total: number }> {
  const { searchKey, filter, pagination, sort } = options;

  try {
    // Build the query
    // const product = await createProduct(productData);
    // const product2 = await createProduct(productData2);
    // console.log("productpp1", product);
    // console.log("productpp2", product2);
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
      whereClause.OR = [
        { name: { contains: searchKey, mode: "insensitive" } },
        { description: { contains: searchKey, mode: "insensitive" } },
        { category: { contains: searchKey, mode: "insensitive" } },
      ];
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
    const orderBy = sort
      ? { [sort.field]: sort.order }
      : ({ createdAt: "desc" } as const);

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
        orderBy: orderBy,
        include: {
          images: true,
          variants: true,
          price: true,
          options: true,
        },
      });
    } else {
      // If no pagination is provided, fetch all products
      products = await prisma.product.findMany({
        where: whereClause,
        orderBy: orderBy,
        include: {
          images: true,
          variants: true,
          price: true,
          options: true,
        },
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
    include: {
      images: true,
      variants: true,
      price: true,
      options: true,
    },
  });
}
export async function fetchProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: { name: slug },
    include: {
      images: true,
      variants: true,
      price: true,
      options: true,
    },
  });
  return product;
}

export async function createProduct(data: any) {
  const { images, variants, price, options, ...productData } = data;

  try {
    const newProduct = await prisma.product.create({
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

    return newProduct;
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

export async function getCart(cartId: string) {
  try {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
                variants: true,
                price: true,
                options: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      throw new Error("Cart not found.");
    }

    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw new Error("Unable to fetch cart.");
  }
}
export async function createCart(customerId?: string) {
  try {
    const newCart = await prisma.cart.create({
      data: {
        customerId: customerId ?? "",
      },
    });
    return newCart;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw new Error("Unable to create cart.");
  }
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
export async function deleteCartItem(cartItemId: string) {
  try {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw new Error("Unable to delete cart item.");
  }
}

// Add or update a cart item
export async function upsertCartItem(
  cartId: string,
  productId: string,
  quantity: number = 1
) {
  try {
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId,
        productId,
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity },
      });
      return updatedCartItem;
    } else {
      const newCartItem = await prisma.cartItem.create({
        data: {
          cartId,
          productId,
          quantity,
        },
      });
      return newCartItem;
    }
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw new Error("Unable to update cart item.");
  }
}

export async function fetchCollections() {
  return await prisma.collection.findMany({
    include: {
      products: {
        include: {
          product: {
            include: {
              images: true,
              variants: true,
              price: true,
              options: true,
            },
          },
        },
      },
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
): Promise<Collection & { products: Product[] }> {
  const { id, title } = options;

  if (!id && !title) {
    throw new Error("Either id or title must be provided.");
  }

  try {
    const whereClause = id ? { id } : { title: title as string };

    const collection = await prisma.collection.findFirst({
      where: whereClause,
      include: {
        products: {
          include: {
            product: {
              include: {
                images: true,
                variants: true,
                price: true,
                options: true,
              },
            }, // Include the full product details
          },
        },
      },
    });

    if (!collection) {
      throw new Error("Collection not found.");
    }

    // Transform the result to include products array directly in the collection
    const fullCollection = {
      ...collection,
      products: collection.products.map((pc) => pc.product),
    };

    return fullCollection;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw new Error("Unable to fetch collection.");
  }
}
interface CreateCustomerData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  image?: string;
}

// Function to create a new customer
export async function createCustomer(data: CreateCustomerData) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create the customer with the hashed password
    const customer = await prisma.customer.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return customer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Unable to create customer.");
  }
}
export async function deleteCustomer(id: number) {
  try {
    const customer = await prisma.customer.delete({
      where: { id },
    });
    return customer;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw new Error("Unable to delete customer.");
  }
}
export async function getCustomers() {
  try {
    const customers = await prisma.customer.findMany();
    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Unable to fetch customers.");
  }
}
export async function getCustomer(identifier: { id?: number; email?: string }) {
  const { id, email } = identifier;

  if (!id && !email) {
    throw new Error("Either id or email must be provided.");
  }

  try {
    const whereClause = id ? { id } : { email: email as string };

    const customer = await prisma.customer.findUnique({
      where: whereClause,
    });

    if (!customer) {
      throw new Error(
        `Customer not found with ${id ? `ID ${id}` : `email ${email}`}.`
      );
    }

    return customer;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw new Error("Unable to fetch customer.");
  }
}
type UpdateCustomerData = Partial<CreateCustomerData>;

export async function updateCustomer(id: number, data: UpdateCustomerData) {
  try {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const customer = await prisma.customer.update({
      where: { id },
      data,
    });
    return customer;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error("Unable to update customer.");
  }
}

interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  const { email, password } = data;

  try {
    // Fetch the user by email
    const user = await prisma.customer.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    // Return user data or a JWT token, etc.
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      image: user.image,
    };
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Unable to log in.");
  }
}
