const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const baseImageUrl =
    "https://qvkdnhfbjppmzromhdae.supabase.co/storage/v1/object/public/images/public/";

  const products = [
    {
      name: "T-Shirt",
      slug: "t-shirt-color",
      description: "Stylish T-shirts in various colors",
      price: 29.99,
      currency: "USD",
      options: {
        color: ["Black", "Blue", "Gray"],
        size: ["Small", "Medium", "Large"],
      },
      images: [
        "t-shirt-color-black.png",
        "t-shirt-color-blue.png",
        "t-shirt-color-primary.png",
      ],
      variants: [
        {
          name: "Black Small",
          quantity: 10,
          price: 29.99,
          color: "Black",
          size: "Small",
        },
        {
          name: "Blue Medium",
          quantity: 15,
          price: 32.99,
          color: "Blue",
          size: "Medium",
        },
        {
          name: "Gray Large",
          quantity: 8,
          price: 34.99,
          color: "Gray",
          size: "Large",
        },
      ],
    },
    {
      name: "T-Shirt Circles",
      slug: "t-shirt-circles",
      description: "T-shirts with circular patterns",
      price: 35.99,
      currency: "USD",
      options: {
        color: ["Blue", "White"],
        size: ["Small", "Medium", "Large"],
      },
      images: ["t-shirt-circles-blue.png", "t-shirt-circles-white.png"],
      variants: [
        {
          name: "Blue Small",
          quantity: 12,
          price: 35.99,
          color: "Blue",
          size: "Small",
        },
        {
          name: "White Large",
          quantity: 8,
          price: 37.99,
          color: "White",
          size: "Large",
        },
      ],
    },
    {
      name: "T-Shirt Spiral",
      slug: "t-shirt-spiral",
      description: "Unique spiral-patterned T-shirts",
      price: 39.99,
      currency: "USD",
      options: {
        color: ["Patterned"],
        size: ["Small", "Medium", "Large"],
      },
      images: ["t-shirt-spiral-1.png", "t-shirt-spiral-2.png"],
      variants: [
        {
          name: "Spiral Small",
          quantity: 10,
          price: 39.99,
          color: "Patterned",
          size: "Small",
        },
        {
          name: "Spiral Large",
          quantity: 7,
          price: 42.99,
          color: "Patterned",
          size: "Large",
        },
      ],
    },
    {
      name: "Shoes",
      slug: "shoes",
      description: "Comfortable and stylish shoes",
      price: 49.99,
      currency: "USD",
      options: {
        color: ["Black", "White"],
        size: ["8", "9", "10"],
      },
      images: ["shoes-2.png", "shoes-1.png"],
      variants: [
        {
          name: "Black Size 8",
          quantity: 20,
          price: 49.99,
          color: "Black",
          size: "8",
        },
        {
          name: "White Size 10",
          quantity: 15,
          price: 54.99,
          color: "White",
          size: "10",
        },
      ],
    },
    {
      name: "Baby Cap",
      slug: "baby-cap",
      description: "Soft and comfortable baby caps",
      price: 14.99,
      currency: "USD",
      options: {
        color: ["Black", "Gray", "White"],
        size: ["One Size"],
      },
      images: [
        "baby-cap-black.png",
        "baby-cap-primary.png",
        "baby-cap-white.png",
      ],
      variants: [
        {
          name: "Black Cap",
          quantity: 50,
          price: 14.99,
          color: "Black",
          size: "One Size",
        },
        {
          name: "Gray Cap",
          quantity: 30,
          price: 14.99,
          color: "Gray",
          size: "One Size",
        },
        {
          name: "White Cap",
          quantity: 40,
          price: 14.99,
          color: "White",
          size: "One Size",
        },
      ],
    },
    {
      name: "Baby Onesie",
      slug: "baby-onesie",
      description: "Soft and cozy baby onesies",
      price: 19.99,
      currency: "USD",
      options: {
        color: ["Beige"],
        size: ["Small", "Medium", "Large"],
      },
      images: ["baby-onesie-beige-1.png"],
      variants: [
        {
          name: "Beige Small",
          quantity: 10,
          price: 19.99,
          color: "Beige",
          size: "Small",
        },
        {
          name: "Beige Medium",
          quantity: 15,
          price: 21.99,
          color: "Beige",
          size: "Medium",
        },
        {
          name: "Beige Large",
          quantity: 8,
          price: 24.99,
          color: "Beige",
          size: "Large",
        },
      ],
    },
    {
      name: "Bomber Jacket",
      slug: "bomber-jacket",
      description: "Stylish bomber jacket",
      price: 79.99,
      currency: "USD",
      options: {
        color: ["Army"],
        size: ["Medium", "Large", "XL"],
      },
      images: ["bomber-jacket-army.png"],
      variants: [
        {
          name: "Army Medium",
          quantity: 5,
          price: 79.99,
          color: "Army",
          size: "Medium",
        },
        {
          name: "Army Large",
          quantity: 3,
          price: 84.99,
          color: "Army",
          size: "Large",
        },
        {
          name: "Army XL",
          quantity: 4,
          price: 89.99,
          color: "Army",
          size: "XL",
        },
      ],
    },
    {
      name: "Hat",
      slug: "hat",
      description: "Simple and stylish hats",
      price: 19.99,
      currency: "USD",
      options: {
        color: ["Black"],
        size: ["One Size"],
      },
      images: ["hat-1.png"],
      variants: [
        {
          name: "Black Hat",
          quantity: 30,
          price: 19.99,
          color: "Black",
          size: "One Size",
        },
      ],
    },
    {
      name: "Hoodie",
      slug: "hoodie",
      description: "Comfortable hoodies for daily wear",
      price: 49.99,
      currency: "USD",
      options: {
        color: ["Gray"],
        size: ["Small", "Medium", "Large"],
      },
      images: ["hoodie-1.png"],
      variants: [
        {
          name: "Gray Small",
          quantity: 10,
          price: 49.99,
          color: "Gray",
          size: "Small",
        },
        {
          name: "Gray Medium",
          quantity: 8,
          price: 54.99,
          color: "Gray",
          size: "Medium",
        },
      ],
    },
  ];

  for (const productData of products) {
    const {
      name,
      slug,
      description,
      price,
      currency,
      options,
      images,
      variants,
    } = productData;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        availableForSale: true,
        tags: [name.toLowerCase(), "fashion", "clothing"],
        price: {
          create: { amount: price, currency: currency },
        },
        options: {
          create: [
            {
              name: "Color",
              values: {
                create: options.color.map((color) => ({ value: color })),
              },
            },
            {
              name: "Size",
              values: { create: options.size.map((size) => ({ value: size })) },
            },
          ],
        },
        images: {
          create: images.map((imageName) => ({
            url: `${baseImageUrl}${imageName}`,
          })),
        },
      },
    });

    const optionValues = await prisma.productOptionValue.findMany({
      where: {
        option: { productId: product.id },
      },
    });

    const findOptionValue = (value: any) =>
      optionValues.find((option: any) => option.value === value);

    for (const variant of variants) {
      const { name, quantity, price, color, size } = variant;
      const colorOptionValue = findOptionValue(color);
      const sizeOptionValue = findOptionValue(size);

      if (colorOptionValue && sizeOptionValue) {
        await prisma.productVariant.create({
          data: {
            name,
            quantity,
            price,
            availableForSale: true,
            productId: product.id,
            variantOptions: {
              create: [
                { optionValueId: colorOptionValue.id },
                { optionValueId: sizeOptionValue.id },
              ],
            },
          },
        });
      }
    }
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
