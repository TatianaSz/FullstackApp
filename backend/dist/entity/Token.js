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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidationResponse = exports.UserToken = void 0;
const input_1 = require("../resolvers/register/input");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let UserToken = class UserToken extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.expireAt = new Date(new Date().setHours(new Date().getHours() + 23));
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserToken.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserToken.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], UserToken.prototype, "expireAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserToken.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.token),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], UserToken.prototype, "user", void 0);
UserToken = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], UserToken);
exports.UserToken = UserToken;
let TokenValidationResponse = class TokenValidationResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => UserToken, { nullable: true }),
    __metadata("design:type", UserToken)
], TokenValidationResponse.prototype, "token", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [input_1.ErrorObj], { nullable: true }),
    __metadata("design:type", Array)
], TokenValidationResponse.prototype, "errorArr", void 0);
TokenValidationResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], TokenValidationResponse);
exports.TokenValidationResponse = TokenValidationResponse;
//# sourceMappingURL=Token.js.map