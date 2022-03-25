import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { PostResolver } from "./resolvers/post/post";
import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import { Post } from "./entity/Post";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { RegisterResolver } from "./resolvers/register/register";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { UserToken } from "./entity/Token";

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "tatiana",
      password: "lireddit",
      database: "lireddit",
      entities: [Post, User, UserToken],
      synchronize: true,
      logging: true,
    });
    const schema: GraphQLSchema = await buildSchema({
      resolvers: [PostResolver, RegisterResolver],
    });
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    const app = express();
    await server.start();

    const RedisStore = connectRedis(session);
    let redisClient = new Redis();

    app.use(
      session({
        name: "qid",
        store: new RedisStore({ client: redisClient }),
        secret: "keyboard cat",
        saveUninitialized: false,
        cookie: {
          maxAge: 1000 * 3600 * 24 * 365 * 5,
          httpOnly: true,
          sameSite: "lax",
        },
        resave: false,
      })
    );

    server.applyMiddleware({
      app,
      cors: {
        origin: true,
        credentials: true,
      },
    });

    app.listen(8080, () => {
      console.log("app");
    });
    app.get("/", (_req, res) => {
      res.send("port 8080 working fine");
    });
  } catch (error) {
    console.error(error);
  }
};

main();
