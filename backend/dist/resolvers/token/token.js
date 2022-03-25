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
exports.TokenResolver = void 0;
const Token_1 = require("../../entity/Token");
const type_graphql_1 = require("type-graphql");
let TokenResolver = class TokenResolver {
    createToken() {
        return Token_1.Token.create().save();
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Token_1.Token),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TokenResolver.prototype, "createToken", null);
TokenResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TokenResolver);
exports.TokenResolver = TokenResolver;
//# sourceMappingURL=token.js.map