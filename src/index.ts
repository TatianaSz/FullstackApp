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

import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";


declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
    userId: number;
  }
}

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
          if(extensions != undefined && extensions["exception"]["validationErrors"] !=undefined ){
           const response =  Object.assign({}, ...extensions["exception"]["validationErrors"].map((el:any)=>{
             return el["constraints"]
           }))
           return {response, message}
          }
         return {extensions, message}
        }});
        const app = express();
        await server.start();

         const RedisStore = connectRedis(session)
         let redisClient = new Redis()


        app.use(
            session({
              name: "ciq",
              store: new RedisStore({ client: redisClient}),
              secret: "keyboard cat",
              saveUninitialized: false,
              cookie:{
                maxAge: 1000 * 3600 * 24 * 365 * 5,
                httpOnly: true,
                sameSite: "none",
                secure: true,
              },
              resave: false,
            })
          )
        
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


