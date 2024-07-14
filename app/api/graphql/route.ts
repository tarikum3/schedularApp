// // app/api/graphql/route.ts
// import { ApolloServer } from "apollo-server-micro";
// // import { typeDefs, resolvers } from "../../../graphql";
import { typeDefs, resolvers } from "../../../graphql";
import { NextApiRequest, NextApiResponse } from "next";
// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // const handler = apolloServer.createHandler({ path: "/api/graphql" });

// // export default async (req, res) => {
// //   return handler(req, res);
// // };
// // const handler = apolloServer.createHandler({ path: "/api/graphql" });

// // export default async (req: NextApiRequest, res: NextApiResponse) => {
// //   return handler(req, res);
// // };
// export default apolloServer.createHandler({ path: "/api/graphql" });
import { ApolloServer } from "apollo-server-micro";
// import { typeDefs } from "../../graphql/schema";
// import { resolvers } from "../../graphql/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
