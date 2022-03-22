"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnValidationError = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
class ErrorStructure {
    constructor(property, constraints, message) {
        this.property = property;
        this.constraints = {
            [constraints]: message,
        };
    }
}
class OwnValidationError extends apollo_server_errors_1.ApolloError {
    constructor(errorCode, property, constraints, message) {
        super("Custom validation error", errorCode);
        this.extensions.exception = {
            validationErrors: [new ErrorStructure(property, constraints, message)],
        };
    }
}
exports.OwnValidationError = OwnValidationError;
//# sourceMappingURL=index.js.map