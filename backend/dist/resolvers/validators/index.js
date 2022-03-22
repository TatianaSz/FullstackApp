"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMin = void 0;
function isMin(elementToValidate, lengthOfElement, errorObject, errorArray) {
    if (elementToValidate.length < lengthOfElement) {
        errorArray.push(errorObject);
    }
}
exports.isMin = isMin;
//# sourceMappingURL=index.js.map