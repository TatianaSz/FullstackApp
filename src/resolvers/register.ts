
import { User } from "../entity/User";
import { Resolver, Query, Arg, Mutation} from "type-graphql";

@Resolver()
export class RegisterResolver {

@Query(() => [User])
users(): Promise<User[]> {
return User.find();
}

}

