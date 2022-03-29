import { TokenValidationResponse, UserToken } from "../../entity/Token";
import { Resolver, Arg, Mutation } from "type-graphql";
import { ErrorObj } from "../register/input";
import { isExpired } from "../validators";

const TokenErrors: Array<ErrorObj> = [];

@Resolver()
export class TokenResolver {
  @Mutation(() => TokenValidationResponse)
  async validToken(
    @Arg("email") email: string,
    @Arg("token") token: string
  ): Promise<TokenValidationResponse | undefined> {
    const foundToken = await UserToken.findOne({
      where: { token: token },
    });
    if (foundToken) {
      foundToken.user.email === email ? { token: foundToken } : undefined;
      isExpired(foundToken, "token", TokenErrors);
    }
    if (TokenErrors.length >= 1) {
      return { errorArr: TokenErrors };
    }
    return undefined;
  }
}
