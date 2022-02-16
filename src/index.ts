import "reflect-metadata";
import { createConnection } from "typeorm";
import { Post } from "./entity/Post";
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./resolvers/main";

const main =async () => {
    try {
        createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "tatiana",
            password: "lireddit",
            database: "lireddit",
            entities: [
                Post
            ],
            synchronize: true,
            logging: false
        })
        const server = new ApolloServer({ typeDefs, resolvers });
        const app = express();
        await server.start()
        
        server.applyMiddleware({app})
        app.listen(8080, ()=>{
            console.log("app")
        })
        app.get("/", (req,res)=>{
            res.send("port 8080 working fine")
        })
    }
    catch(error) { console.log(error)};
}
// .then( async connection => {
//     let post = new Post();
//     post.name = "switched to typeorm";
//     await connection.manager
//             .save(post)
//             .then(post => {
//                 console.log("succes", post.id);
//             });
// })
main();