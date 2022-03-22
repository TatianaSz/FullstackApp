import { ApolloError } from "apollo-server-errors";

class ErrorStructure {
  property: string;
  constraints: {};
  constructor(property: string, constraints: string, message: string) {
    this.property = property;
    this.constraints = {
      [constraints]: message,
    };
  }
}

export class OwnValidationError extends ApolloError {
  constructor(
    errorCode: any,
    property: string,
    constraints: string,
    message: string
  ) {
    super("Custom validation error", errorCode);
    this.extensions.exception = {
      validationErrors: [new ErrorStructure(property, constraints, message)],
    };
  }
}
