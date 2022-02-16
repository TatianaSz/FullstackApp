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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Post_1 = require("./entity/Post");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const main_1 = require("./resolvers/main");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        });
        const server = new apollo_server_express_1.ApolloServer({ typeDefs: main_1.typeDefs, resolvers: main_1.resolvers });
        const app = (0, express_1.default)();
        yield server.start();
        server.applyMiddleware({ app });
        app.listen(8080, () => {
            console.log("app");
        });
        app.get("/", (req, res) => {
            res.send("port 8080 working fine");
        });
    }
    catch (error) {
        console.log(error);
    }
    ;
});
main();
//# sourceMappingURL=index.js.map