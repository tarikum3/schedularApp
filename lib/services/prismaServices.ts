import prisma, { Product, Collection, EventLog } from "@lib/prisma";
import { applyCollectionRules, convertToSlug } from "@/lib/helper";
import { supabase } from "@lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import { addComputedCartPrices } from "@/lib/helper";
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

export const productSortField = ["name", "createdAt", "price"];

interface CreateEventLogInput {
  userId: string;
  resourceType: string;
  resourceName: string;
  resourceId: string;
  action: string;
  changedField?: string; // Optional
  ipAddress?: string; // Optional
}

export async function createEventLog(input: CreateEventLogInput) {
  const { userId, resourceName, action } = input;

  try {
    const eventLog = await prisma.eventLog.create({
      data: {
        userId,

        resourceName,

        action,
      },
    });
    return eventLog;
  } catch (error) {
    console.error(`Failed to create Event Log: ${error}`);
    throw new Error(`Failed to create Event Log: ${error}`);
  }
}

export interface FetchEventsOptions {
  searchKey?: string;
  filter?: {
    resourceName?: string;
    action?: string;
    startDate?: Date;
    endDate?: Date;
  };
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  sort?: {
    field: string;
    order: "asc" | "desc";
  };
}

export async function fetchEvents(
  options: FetchEventsOptions
): Promise<{ events: EventLog[]; total: number }> {
  const { searchKey, filter, pagination, sort } = options;

  try {
    const whereClause: any = {};

    // Handle searchKey
    if (searchKey) {
      whereClause.OR = [
        { resourceName: { contains: searchKey, mode: "insensitive" } },
        { action: { contains: searchKey, mode: "insensitive" } },
      ];
    }

    // Handle filter
    if (filter) {
      if (filter.resourceName) {
        whereClause.resourceName = filter.resourceName;
      }

      if (filter.action) {
        whereClause.action = filter.action;
      }

      if (filter.startDate) {
        whereClause.createdAt = { gte: filter.startDate };
      }

      if (filter.endDate) {
        whereClause.createdAt = whereClause.createdAt
          ? { ...whereClause.createdAt, lte: filter.endDate }
          : { lte: filter.endDate };
      }
    }

    const orderBy = sort
      ? {
          [sort.field]: sort.order,
        }
      : { createdAt: "desc" as const };

    // Handle pagination
    let events: EventLog[];
    const total = await prisma.eventLog.count({ where: whereClause });

    if (pagination) {
      const page = pagination.page ?? 1;
      const pageSize = pagination.pageSize ?? 10;
      const skip = (page - 1) * pageSize;
      const take = pageSize;

      events = await prisma.eventLog.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: orderBy,
        include: {
          user: true,
        },
      });
    } else {
      // If no pagination is provided, fetch all events
      events = await prisma.eventLog.findMany({
        where: whereClause,
        orderBy: orderBy,
        include: {
          user: true,
        },
      });
    }

    return { events, total };
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Unable to fetch events.");
  }
}
export async function fetchEventById(id: string) {
  return await prisma.eventLog.findUnique({
    where: { id },
    include: {
      user: true, // Include the user relation if needed
    },
  });
}

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
      ? {
          [sort.field]:
            sort.field === "price" ? { amount: sort.order } : sort.order,
        }
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
          variants: {
            include: {
              variantOptions: {
                include: { optionValue: { include: { option: true } } },
              },
            },
          },
          price: true,
          options: { include: { values: true } },
        },
      });
    } else {
      // If no pagination is provided, fetch all products
      products = await prisma.product.findMany({
        where: whereClause,
        orderBy: orderBy,
        include: {
          images: true,
          variants: {
            include: {
              variantOptions: {
                include: { optionValue: { include: { option: true } } },
              },
            },
          },
          price: true,
          options: {
            include: {
              values: { include: { option: true } },
            },
          },
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
      variants: {
        include: {
          variantOptions: {
            include: { optionValue: { include: { option: true } } },
          },
        },
      },
      price: true,
      options: {
        include: {
          values: { include: { option: true } },
        },
      },
    },
  });
}

export async function fetchProductBySlug(slug: string) {
  //console.log("slug", slug);
  const product = await prisma.product.findFirst({
    where: { slug: slug },
    include: {
      images: true,
      variants: {
        include: {
          variantOptions: {
            include: { optionValue: { include: { option: true } } },
          },
        },
      },
      price: true,
      options: {
        include: {
          values: { include: { option: true } },
        },
      },
    },
  });
  ///console.log("slug", product);
  return product;
}

export async function createProduct(data: any) {
  const { images, variants, price, options, ...productData } = data;
  const slug = convertToSlug(data.name);
  try {
    const newProduct = await prisma.product.create({
      data: {
        ...productData,
        slug,
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
            variant: {
              include: {
                product: {
                  include: {
                    images: true,
                  },
                },
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
export async function createCart(userId?: string) {
  try {
    const newCart = await prisma.cart.create({
      data: {
        userId: userId ?? "",
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

  // try {
  //   const updatedCart = await prisma.cart.update({
  //     where: { id },
  //     data,
  //   });
  //   return updatedCart;
  // } catch (error) {
  //   console.error("Error updating cart:", error);
  //   throw new Error("Unable to updating  cart.");
  // }
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
  variantId: string,
  quantity: number = 1
) {
  try {
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId,
        variantId,
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
          variantId,
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
              variants: {
                include: {
                  variantOptions: {
                    include: { optionValue: { include: { option: true } } },
                  },
                },
              },
              price: true,
              options: {
                include: {
                  values: { include: { option: true } },
                },
              },
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

  sortProduct?: {
    field: "name" | "createdAt" | "price";
    order: "asc" | "desc";
  };
}

export async function seedCollections() {
  const collections = [
    {
      title: "men",
      description: "Collection of men's clothing and accessories.",
      rules: [
        { field: "name", condition: "contains", value: "Shoes" },
        { field: "name", condition: "contains", value: "T-Shirt Spiral" },
        { field: "name", condition: "contains", value: "Bomber Jacket" },
        { field: "name", condition: "contains", value: "Hat" },
        { field: "name", condition: "contains", value: "Hoodie" },
      ],
    },
    {
      title: "women",
      description: "Collection of women's clothing and accessories.",
      rules: [
        { field: "name", condition: "contains", value: "Baby Cap" },
        { field: "name", condition: "contains", value: "T-Shirt" },
      ],
    },
  ];

  for (const collectionData of collections) {
    await createCollection(collectionData);
  }

  console.log("Collections seeded successfully!");
}

export async function fetchCollection(
  options: FetchCollectionOptions
): Promise<Collection & { products: Product[] }> {
  const { id, title, sortProduct } = options;

  const collectionData3 = {
    title: "men",
    description: "men collection.",
    rules: [
      {
        field: "description",
        condition: "contains",
        value: "jacket",
      },
      // {
      //   field: "price",
      //   condition: "greater_than",
      //   value: "20",
      // },
    ],
  };
  const collectionData4 = {
    title: "women",
    description: "women collection.",
    rules: [
      {
        field: "description",
        condition: "contains",
        value: "t-shirt",
      },
    ],
  };
  if (!id && !title) {
    throw new Error("Either id or title must be provided.");
  }

  try {
    const whereClause = id ? { id } : { title: title as string };

    // const collection = await prisma.collection.findFirst({
    //   where: whereClause,
    //   include: {
    //     products: {
    //       include: {
    //         product: {
    //           include: {
    //             images: true,
    //             variants: {
    //               include: {
    //                 variantOptions: {
    //                   include: { optionValue: { include: { option: true } } },
    //                 },
    //               },
    //             },
    //             price: true,
    //             options: { include: { values: true } },
    //           },
    //         }, // Include the full product details
    //       },

    //     },
    //   },
    // });

    const orderBy = sortProduct
      ? {
          product: {
            [sortProduct.field]:
              sortProduct.field === "price"
                ? { amount: sortProduct.order }
                : sortProduct.order,
          },
        }
      : { product: { createdAt: "desc" } };
    const collection = await prisma.collection.findFirst({
      where: whereClause,
      include: {
        products: {
          include: {
            product: {
              include: {
                images: true,
                variants: {
                  include: {
                    variantOptions: {
                      include: { optionValue: { include: { option: true } } },
                    },
                  },
                },
                price: true,
                options: { include: { values: true } },
              },
            },
          },
          // orderBy: {
          //   product: {
          //     name: "asc", // Use 'desc' for descending order
          //   },
          // },
          // ...(orderBy&&{orderBy: orderBy}),
          orderBy: orderBy as any,
        },
      },
    });

    if (!collection) {
      throw new Error("Collection not found.");
    }
    // console.log("collectionnn", collection);
    // await applyCollectionRules(collection.id);
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
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    const customer = await prisma.customer.create({
      data: {
        userId: user.id,
        password: user.password,
        ...(user.firstName && { firstName: user.firstName }),
        ...(user.lastName && { lastName: user.lastName }),
        ...(user.email && { email: user.email }),
        ...(user.phone && { phone: user.phone }),
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Unable to create customer.");
  }
}
export async function deleteCustomer(id: string) {
  try {
    const customer = await prisma.user.delete({
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
    const customers = await prisma.user.findMany();
    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Unable to fetch customers.");
  }
}
export async function getCustomer(identifier: { id?: string; email?: string }) {
  const { id, email } = identifier;

  if (!id && !email) {
    throw new Error("Either id or email must be provided.");
  }

  try {
    const whereClause = id ? { id } : { email: email as string };

    const customer = await prisma.user.findUnique({
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

export async function updateCustomer(id: string, data: UpdateCustomerData) {
  try {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const customer = await prisma.user.update({
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
    const user = await prisma.user.findUnique({
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

export async function placeOrder(cartId: string) {
  return await prisma.$transaction(async (tx) => {
    // Fetch Cart and Items
    const cart = await tx.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { variant: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart not found or empty");
    }

    const customer = await prisma.customer.findUnique({
      where: { userId: cart.userId },
    });
    if (!customer) {
      throw new Error("Customer not found or empty");
    }

    let cartC = addComputedCartPrices(cart);
    // Create Order

    const order = await tx.order.create({
      data: {
        userId: cartC.userId,
        firstName: cartC.firstName,
        lastName: cartC.lastName,
        email: cartC.email,
        phone: cartC.phone,
        companyName: cartC.companyName,
        address: cartC.address,
        city: cartC.city,
        country: cartC.country,
        postalCode: cartC.postalCode,
        billingName: cartC.billingName,
        billingEmail: cartC.billingEmail,
        billingCompanyName: cartC.billingCompanyName,
        billingAddress: cartC.billingAddress,
        paymentMethod: cartC.paymentMethod,
        deliveryMethod: cartC.deliveryMethod,
        currency: cartC.currency,
        subtotalPrice: cartC.subtotalPrice,
        totalPrice: cartC.totalPrice,
        status: "PENDING",
        items: {
          create: cart.items.map((cartItem) => ({
            variantId: cartItem.variantId,
            quantity: cartItem.quantity,
          })),
        },
      },
      include: { items: true },
    });

    await tx.customer.update({
      where: { id: customer.id },
      data: {
        totalOrders: { increment: 1 },
        totalSpent: { increment: cartC.totalPrice },
        lastOrderDate: new Date(),
      },
    });

    // Clear Cart After Order is Placed
    // await tx.cartItem.deleteMany({ where: { cartId } });

    return order;
  });
}
