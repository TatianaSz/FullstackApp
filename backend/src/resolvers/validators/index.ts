import { ErrorObj } from "../register/input";

export function isMin(
  elementToValidate: string,
  lengthOfElement: number,
  errorObject: ErrorObj,
  errorArray: ErrorObj[]
) {
  if (elementToValidate.length < lengthOfElement) {
    errorArray.push(errorObject);
  }
}
