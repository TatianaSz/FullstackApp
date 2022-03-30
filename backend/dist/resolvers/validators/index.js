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
exports.isVerified = exports.isExpired = exports.canLogin = exports.isUsed = exports.isEmail = exports.isMin = void 0;
const User_1 = require("../../entity/User");
function isMin(elementToValidate, field, lengthOfElement, errorArray) {
    if (elementToValidate.length < lengthOfElement) {
        errorArray.push({
            field: field,
            message: `${field} has to be longer than ${lengthOfElement} characters!`,
        });
    }
}
exports.isMin = isMin;
function isEmail(email, field, errorArray) {
    const emailRegex = new RegExp(/^\S.*@\S+\.\S+$/);
    if (!emailRegex.test(email)) {
        errorArray.push({
            field: field,
            message: `${field} has to be an email!`,
        });
    }
}
exports.isEmail = isEmail;
function isUsed(email, field, errorArray) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({
            where: { email },
        });
        if (user) {
            errorArray.push({
                field: field,
                message: `${field} is already used!`,
            });
        }
    });
}
exports.isUsed = isUsed;
function canLogin(user, field, errorArray) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user.validated) {
            errorArray.push({
                field: field,
                message: `User not verified, can't log in!`,
            });
        }
    });
}
exports.canLogin = canLogin;
function isExpired(token, field, errorArray) {
    return __awaiter(this, void 0, void 0, function* () {
        const expirationDate = new Date(token.expireAt);
        const currentDay = new Date();
        if (expirationDate < currentDay) {
            errorArray.push({
                field: field,
                message: `Token is expired!`,
            });
        }
    });
}
exports.isExpired = isExpired;
function isVerified(user, field, errorArray) {
    return __awaiter(this, void 0, void 0, function* () {
        if (user.validated) {
            errorArray.push({
                field: field,
                message: `User is already verified, please log in`,
            });
        }
    });
}
exports.isVerified = isVerified;
//# sourceMappingURL=index.js.map