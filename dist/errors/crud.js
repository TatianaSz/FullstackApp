"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDError = void 0;
class CRUDError extends Error {
    constructor(message) {
        super(message);
        this.name = "CRUDError";
    }
}
exports.CRUDError = CRUDError;
//# sourceMappingURL=crud.js.map