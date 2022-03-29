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
const post_1 = require("./resolvers/post/post");
const type_graphql_1 = require("type-graphql");
const Post_1 = require("./entity/Post");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const register_1 = require("./resolvers/register/register");
const apollo_server_core_1 = require("apollo-server-core");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const Token_1 = require("./entity/Token");
const token_1 = require("./resolvers/token/token");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.createConnection)({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "tatiana",
            password: "lireddit",
            database: "lireddit",
            entities: [Post_1.Post, User_1.User, Token_1.UserToken],
            synchronize: true,
            logging: true,
        });
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: [post_1.PostResolver, register_1.RegisterResolver, token_1.TokenResolver],
        });
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            context: ({ req, res }) => ({ req, res }),
            plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
        });
        const app = (0, express_1.default)();
        yield server.start();
        const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
        let redisClient = new ioredis_1.default();
        app.use((0, express_session_1.default)({
            name: "qid",
            store: new RedisStore({ client: redisClient }),
            secret: "keyboard cat",
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 3600 * 24 * 365 * 5,
                httpOnly: true,
                sameSite: "lax",
            },
            resave: false,
        }));
        server.applyMiddleware({
            app,
            cors: {
                origin: true,
                credentials: true,
            },
        });
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