import { UserToken } from "../../entity/Token";
import { User } from "../../entity/User";
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
export async function isUsed(
  email: string,
  field: string,
  errorArray: ErrorObj[]
) {
  const user = await User.findOne({
    where: { email },
  });
  if (user) {
    errorArray.push({
      field: field,
      message: `${field} is already used!`,
    });
  }
}

export async function isExpired(
  token: UserToken,
  field: string,
  errorArray: ErrorObj[]
) {
  const expirationDate = new Date(token.expireAt);
  const currentDay = new Date();
  if (expirationDate < currentDay) {
    errorArray.push({
      field: field,
      message: `Token is expired!`,
    });
  }
}
