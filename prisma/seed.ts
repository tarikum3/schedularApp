// //

// //import prisma from "lib/prisma"; // Adjust based on your project
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// async function main() {
//   const products = [
//     {
//       name: "T-Shirt",
//       slug: "t-shirt",
//       description: "A stylish T-Shirt",
//       price: 29.99,
//       currency: "USD",
//       options: {
//         color: ["Red", "Blue", "Green"],
//         size: ["Small", "Medium", "Large"],
//       },
//       variants: [
//         {
//           name: "Red Small",
//           quantity: 10,
//           price: 29.99,
//           color: "Red",
//           size: "Small",
//         },
//         {
//           name: "Blue Medium",
//           quantity: 15,
//           price: 32.99,
//           color: "Blue",
//           size: "Medium",
//         },
//         {
//           name: "Green Large",
//           quantity: 8,
//           price: 34.99,
//           color: "Green",
//           size: "Large",
//         },
//       ],
//     },
//     {
//       name: "Sneakers",
//       slug: "sneakers",
//       description: "Comfortable and stylish sneakers",
//       price: 49.99,
//       currency: "USD",
//       options: {
//         color: ["Black", "White"],
//         size: ["7", "8", "9", "10"],
//       },
//       variants: [
//         {
//           name: "Black Size 8",
//           quantity: 25,
//           price: 49.99,
//           color: "Black",
//           size: "8",
//         },
//         {
//           name: "White Size 9",
//           quantity: 20,
//           price: 52.99,
//           color: "White",
//           size: "9",
//         },
//       ],
//     },
//     {
//       name: "Jacket",
//       slug: "jacket",
//       description: "Warm and stylish jacket",
//       price: 79.99,
//       currency: "USD",
//       options: {
//         color: ["Black", "Navy", "Gray"],
//         size: ["Small", "Medium", "Large", "XL"],
//       },
//       variants: [
//         {
//           name: "Black Medium",
//           quantity: 5,
//           price: 79.99,
//           color: "Black",
//           size: "Medium",
//         },
//         {
//           name: "Navy Large",
//           quantity: 3,
//           price: 84.99,
//           color: "Navy",
//           size: "Large",
//         },
//         {
//           name: "Gray XL",
//           quantity: 4,
//           price: 89.99,
//           color: "Gray",
//           size: "XL",
//         },
//       ],
//     },
//     // Add more products as needed
//   ];

//   // Loop through products array to create each product with options and variants
//   for (const productData of products) {
//     const { name, slug, description, price, currency, options, variants } =
//       productData;

//     const product = await prisma.product.create({
//       data: {
//         name,
//         slug,
//         description,
//         availableForSale: true,
//         tags: [name.toLowerCase(), "fashion", "clothing"],
//         price: {
//           create: {
//             amount: price,
//             currency: currency,
//           },
//         },
//         options: {
//           create: [
//             {
//               name: "Color",
//               values: {
//                 create: options.color.map((color) => ({ value: color })),
//               },
//             },
//             {
//               name: "Size",
//               values: {
//                 create: options.size.map((size) => ({ value: size })),
//               },
//             },
//           ],
//         },
//       },
//     });

//     // Fetch option values for variants
//     const optionValues = await prisma.productOptionValue.findMany({
//       where: {
//         option: {
//           productId: product.id,
//         },
//       },
//     });

//     // Helper function to find the corresponding option value
//     const findOptionValue = (value: any) =>
//       optionValues.find((optionValue: any) => optionValue.value === value);

//     // Create variants for the product
//     for (const variantData of variants) {
//       const { name, quantity, price, color, size } = variantData;

//       const colorOptionValue = findOptionValue(color);
//       const sizeOptionValue = findOptionValue(size);

//       if (colorOptionValue && sizeOptionValue) {
//         await prisma.productVariant.create({
//           data: {
//             name,
//             quantity,
//             price,
//             availableForSale: true,
//             productId: product.id,
//             variantOptions: {
//               create: [
//                 {
//                   optionValueId: colorOptionValue.id,
//                 },
//                 {
//                   optionValueId: sizeOptionValue.id,
//                 },
//               ],
//             },
//           },
//         });
//       }
//     }
//   }

//   console.log("Seeding completed!");
// }

// // Run the seed script
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const baseImageUrl = "https://qvkdnhfbjppmzromhdae.supabase.co/storage/v1/object/public/images/public/";

  const products = [
    {
      name: "T-Shirt",
      slug: "t-shirt-color", // Slug based on base name
      description: "A stylish T-Shirt",
      price: 29.99,
      currency: "USD",
      options: {
        color: ["Red", "Blue", "Green"],
        size: ["Small", "Medium", "Large"],
      },
      variants: [
        {
          name: "T-Shirt Red Small",
          quantity: 10,
          price: 29.99,
          color: "Red",
          size: "Small",
          imageName: "t-shirt-color-red.png",
        },
        {
          name: "T-Shirt Blue Medium",
          quantity: 15,
          price: 32.99,
          color: "Blue",
          size: "Medium",
          imageName: "t-shirt-color-blue.png",
        },
        {
          name: "T-Shirt Green Large",
          quantity: 8,
          price: 34.99,
          color: "Green",
          size: "Large",
          imageName: "t-shirt-color-green.png",
        },
      ],
    },
    {
      name: "Sneakers",
      slug: "sneakers",
      description: "Comfortable and stylish sneakers",
      price: 49.99,
      currency: "USD",
      options: {
        color: ["Black", "White"],
        size: ["7", "8", "9", "10"],
      },
      variants: [
        {
          name: "Black Size 8",
          quantity: 25,
          price: 49.99,
          color: "Black",
          size: "8",
          imageName: "shoes-2.png",
        },
        {
          name: "White Size 9",
          quantity: 20,
          price: 52.99,
          color: "White",
          size: "9",
          imageName: "shoes-2.png",
        },
      ],
    },
    // Add more products as needed
  ];

  // Loop through products array to create each product with options, variants, and images
  for (const productData of products) {
    const { name, slug, description, price, currency, options, variants } = productData;

    // Create the product
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        availableForSale: true,
        tags: [name.toLowerCase(), "fashion", "clothing"],
        price: {
          create: {
            amount: price,
            currency: currency,
          },
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
              values: {
                create: options.size.map((size) => ({ value: size })),
              },
            },
          ],
        },
      },
    });

    // Fetch option values for variants
    const optionValues = await prisma.productOptionValue.findMany({
      where: {
        option: {
          productId: product.id,
        },
      },
    });

    // Helper function to find the corresponding option value
    const findOptionValue = (value:any) =>
      optionValues.find((optionValue:any) => optionValue.value === value);

    // Create variants for the product
    for (const variantData of variants) {
      const { name, quantity, price, color, size, imageName } = variantData;

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
                {
                  optionValueId: colorOptionValue.id,
                },
                {
                  optionValueId: sizeOptionValue.id,
                },
              ],
            },
            images: {
              create: {
                url: `${baseImageUrl}${imageName}`, // URL for each variant's image
              },
            },
          },
        });
      }
    }
  }

  console.log("Seeding completed!");
}

// Run the seed script
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
