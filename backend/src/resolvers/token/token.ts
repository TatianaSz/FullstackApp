import { UserToken } from "../../entity/Token";
import { Resolver, Mutation } from "type-graphql";

@Resolver()
export class TokenResolver {
  @Mutation(() => UserToken)
  createToken(): Promise<UserToken> {
    return UserToken.create().save();
  }
}
