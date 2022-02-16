import "reflect-metadata";
import { createConnection } from "typeorm";
import { Post } from "./entity/Post";
import express from 'express';

const app = express();

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
        console.log("connected to database")
        app.use(express.json())
        app.get("/", (req,res)=>{
            res.send("port 8080 working fine")
        })
        app.listen(8080, ()=>{
            console.log("app")
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