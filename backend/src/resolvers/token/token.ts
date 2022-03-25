import { Token } from "../../entity/Token";
import { Resolver, Mutation } from "type-graphql";

@Resolver()
export class TokenResolver {
  @Mutation(() => Token)
  createToken(): Promise<Token> {
    return Token.create().save();
  }
}
