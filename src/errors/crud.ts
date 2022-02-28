export class CRUDError extends Error {
    constructor(message: string | undefined) {
      super(message);
      this.name = "CRUDError";
    }
  }