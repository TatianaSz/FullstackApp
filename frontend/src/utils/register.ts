import { ErrorObj } from '../generated/graphql';

export const errorFormat = (error: ErrorObj[]) => {
  const errorMap: Record<string, string> = {};
  error.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};
