import "reflect-metadata";
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { PostResolver } from "./resolvers/main";
import { buildSchema } from "type-graphql";
import {  GraphQLError, GraphQLSchema } from "graphql";
import { Post } from "./entity/Post";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { RegisterResolver } from "./resolvers/register/register";

// import session from "express-session";
// import connectRedis from "connect-redis";
// import Redis from "ioredis";
// import cors from "cors";

const main =async () => {
    try{
      await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "tatiana",
            password: "lireddit",
            database: "lireddit",
            entities: [
                Post, User
            ],
            synchronize: true,
            logging: true
        })
        const schema: GraphQLSchema = await buildSchema({
            resolvers: [PostResolver, RegisterResolver] 
          })
        const server = new ApolloServer({schema,context: ({ req, res }) => ({ req, res }), formatError: (error:GraphQLError)=>{
          const {extensions, message} = error
          if(extensions !=undefined){
            const code = extensions["code"]
            const response = Object.assign({}, ...extensions["exception"]["validationErrors"].map((el:any)=>{
              return el["constraints"]
            }))
            return { code, response, message};
        }
          return { message};
        }});
        const app = express();
        await server.start();

        // const RedisStore = connectRedis(session)
        // app.use(cors({
        //   credentials: true,
        //   origin: "http://localhost:8080"
        // }))
        //   const redisClient = new Redis()
        // app.use(
        //     session({
        //       store: new RedisStore({ client: redisClient }),
        //       saveUninitialized: false,
        //       secret: "keyboard cat",
        //       resave: false,
        //     })
        //   )
        
        server.applyMiddleware({app})
        app.listen(8080, ()=>{
            console.log("app")
        })
        app.get("/", (_req,res)=>{
            res.send("port 8080 working fine")
        })
    }
    catch (error) {
        console.error(error);
      }
   
}


main();