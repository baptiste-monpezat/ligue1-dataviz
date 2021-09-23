// pages/api/graphql.js
import { MongoClient } from "mongodb";
import { ApolloServer } from "apollo-server-micro";
import { makeExecutableSchema } from "graphql-tools";

import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

require("dotenv").config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

let db;

const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(process.env.MONGO_DB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        await dbClient.connect();
        db = dbClient.db("ligue1"); // database name
      } catch (e) {
        console.log("--->error while connecting with graphql context (db)", e);
      }
    }

    return { db };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
