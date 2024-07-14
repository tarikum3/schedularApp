// //import { gql } from "apollo-server-micro";
// import { gql } from "graphql-request";
// export const typeDefs = gql`
//   type Product {
//     id: ID!
//     title: String!
//     description: String
//     price: Float!
//   }

//   type Query {
//     products: [Product]
//     product(id: ID!): Product
//     hello: String
//   }

//   type Mutation {
//     createProduct(title: String!, description: String, price: Float!): Product
//   }
// `;
import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    hello: String
  }
`;
