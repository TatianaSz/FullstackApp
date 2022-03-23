"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.RegisterResolver = void 0;
const User_1 = require("../../entity/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const type_graphql_1 = require("type-graphql");
const input_1 = require("./input");
const errors_1 = require("../../errors");
const validators_1 = require("../validators");
let UserErrors = [];
let RegisterResolver = class RegisterResolver {
    users() {
        return User_1.User.find();
    }
    savedUsers(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ctx.req.session.userId) {
                return undefined;
            }
            const user = yield User_1.User.findOne(ctx.req.session.userId);
            return user;
        });
    }
    createUser({ username, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            UserErrors = [];
            (0, validators_1.isMin)(username, "Username", 4, UserErrors);
            (0, validators_1.isMin)(password, "Password", 6, UserErrors);
            (0, validators_1.isEmail)(email, "Email", UserErrors);
            if (UserErrors.length >= 1) {
                return { errorArr: UserErrors };
            }
            const hashed = yield bcryptjs_1.default.hash(password, 14);
            const user = yield User_1.User.create({
                username,
                email,
                password: hashed,
            }).save();
            return { user };
        });
    }
    login({ loginType, password }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: [{ username: loginType }, { email: loginType }],
            });
            if (!user) {
                throw new errors_1.OwnValidationError("LOGIN_FAILED", "username", "doesUserExist", "User not found");
            }
            const checkPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!checkPassword) {
                throw new errors_1.OwnValidationError("LOGIN_FAILED", "password", "isValidPassword", "Invalid password");
            }
            ctx.req.session.userId = user.id;
            return user;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "savedUsers", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => input_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "login", null);
RegisterResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], RegisterResolver);
exports.RegisterResolver = RegisterResolver;
//# sourceMappingURL=register.js.map