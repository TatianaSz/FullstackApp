import { Configuration, IDatabaseDriver, Connection, Options } from "@mikro-orm/core";
import { Post } from "./entieties/Post";
import path from "path";

export default {
    migrations:{
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    },
    entities: [Post],
    dbName: "lireddit",
    type: 'postgresql',
    user: "tatiana",
    password: "lireddit"
} as Configuration<IDatabaseDriver<Connection>> | Options<IDatabaseDriver<Connection>> | undefined