
import { User } from "../../entity/User";
import bcrypt from "bcryptjs"
import { Resolver, Query, Arg, Mutation} from "type-graphql";
import { LoginInput, RegisterInput } from "./validation";
import { OwnValidationError } from "../../errors"

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
  const user =  await User.create({
      username,
      email,
      password: hashed
    }).save()
   return user
}

@Mutation(() => User)
async login(
  @Arg("input") {loginType, password}: LoginInput)
  : Promise<User>
{
  const user = await User.findOne({ where: [{ username:loginType }, {email:loginType}] })
 
  if(!user){
    throw new OwnValidationError("LOGIN_FAILED", "username", "doesUserExist", "User not found")
  }
const checkPassword = await bcrypt.compare(password, user.password)
if(!checkPassword){
  throw new OwnValidationError("LOGIN_FAILED", "password", "isValidPassword", "Invalid password")
}
  return user
}
}
