import { ErrorObj } from "../register/input";

export function isMin(
  elementToValidate: string,
  field: string,
  lengthOfElement: number,
  errorArray: ErrorObj[]
) {
  if (elementToValidate.length < lengthOfElement) {
    errorArray.push({
      field: field,
      message: `${field} has to be longer than ${lengthOfElement} characters!`,
    });
  }
}
export function isEmail(email: string, field: string, errorArray: ErrorObj[]) {
  const emailRegex = new RegExp(/^\S.*@\S+\.\S+$/);
  if (!emailRegex.test(email)) {
    errorArray.push({
      field: field,
      message: `${field} has to be an email!`,
    });
  }
}
