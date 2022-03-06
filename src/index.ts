import "reflect-metadata";
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { PostResolver } from "./resolvers/main";
import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import { Post } from "./entity/Post";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { RegisterResolver } from "./resolvers/register/register";

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
        const server = new ApolloServer({schema,context: ({ req, res }) => ({ req, res })});
        const app = express();
        await server.start()
        
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