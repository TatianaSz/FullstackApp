"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Post_1 = require("./entity/Post");
(0, typeorm_1.createConnection)({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "tatiana",
    password: "lireddit",
    database: "lireddit",
    entities: [
        Post_1.Post
    ],
    synchronize: true,
    logging: false
}).then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    let post = new Post_1.Post();
    post.name = "switched to typeorm";
    yield connection.manager
        .save(post)
        .then(post => {
        console.log("Photo has been saved. Photo id is", post.id);
    });
})).catch(error => console.log(error));
//# sourceMappingURL=index.js.map