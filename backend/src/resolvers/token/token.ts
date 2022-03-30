import { TokenValidationResponse, UserToken } from "../../entity/Token";
import { Resolver, Arg, Mutation } from "type-graphql";
import { ErrorObj } from "../register/input";
import { isExpired } from "../validators";
import { User } from "../../entity/User";

let TokenErrors: Array<ErrorObj> = [];

@Resolver()
export class TokenResolver {
  @Mutation(() => TokenValidationResponse)
  async validToken(
    @Arg("email") email: string,
    @Arg("token") token: string
  ): Promise<TokenValidationResponse | undefined> {
    TokenErrors = [];
    const foundToken = await UserToken.findOne({
      where: { token: token },
    });
    if (foundToken) {
      isExpired(foundToken, "token", TokenErrors);
      //if token is found, check if its not expired
      if (TokenErrors.length >= 1) {
        return { errorArr: TokenErrors };
      }
      //return errors if smth is wrong with token, no need to check for user
      const validatingUser = await User.findOne(foundToken.userId);
      //if everything is gucci with token, find its user
      if (validatingUser) {
        //check if the users email is the same as the one in the link
        if (validatingUser.email === email) return { token: foundToken };
      }
    }
    return undefined;
  }
}
