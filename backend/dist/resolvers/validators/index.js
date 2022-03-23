"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = exports.isMin = void 0;
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
//# sourceMappingURL=index.js.map