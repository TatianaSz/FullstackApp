
import { User } from "../../entity/User";
import bcrypt from "bcryptjs"
import { Resolver, Query, Arg, Mutation} from "type-graphql";
import { RegisterInput } from "./validation";

@Resolver()
export class RegisterResolver {

@Query(() => [User])
users(): Promise<User[]> {
return User.find();
}

@Mutation(() => User)
async createUser(
  @Arg("input") {username, email, password}: RegisterInput)
  : Promise<User>
{
const hashed = await bcrypt.hash(password, 14)
  return await User.create({
      username,
      email,
      password: hashed
    }).save()
}
}

