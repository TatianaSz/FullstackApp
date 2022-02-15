import "reflect-metadata";
import { createConnection } from "typeorm";
import { Post } from "./entity/Post";

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
}).then( async connection => {
    let post = new Post();
    post.name = "switched to typeorm";
    await connection.manager
            .save(post)
            .then(post => {
                console.log("Photo has been saved. Photo id is", post.id);
            });
}).catch(error => console.log(error));