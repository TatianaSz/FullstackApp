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
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const main_1 = require("./resolvers/main");
const type_graphql_1 = require("type-graphql");
const Post_1 = require("./entity/Post");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.createConnection)({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "tatiana",
            password: "lireddit",
            database: "lireddit",
            entities: [
                Post_1.Post, User_1.User
            ],
            synchronize: true,
            logging: false
        });
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: [main_1.PostResolver]
        });
        const server = new apollo_server_express_1.ApolloServer({ schema, context: ({ req, res }) => ({ req, res }) });
        const app = (0, express_1.default)();
        yield server.start();
        server.applyMiddleware({ app });
        app.listen(8080, () => {
            console.log("app");
        });
        app.get("/", (_req, res) => {
            res.send("port 8080 working fine");
        });
    }
    catch (error) {
        console.error(error);
    }
});
main();
//# sourceMappingURL=index.js.map