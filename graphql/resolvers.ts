// import Product from "../models/product";

// export const resolvers = {
//   Query: {
//     hello: () => "Hello, world!",
//     // products: () => Product.findAll(),
//     // product: (parent, { id }) => Product.findByPk(id),
//   },
//   Mutation: {
//     // createProduct: (parent, { title, description, price }) => {
//     //   return Product.create({ title, description, price });
//     // },
//   },
// };
export const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};
