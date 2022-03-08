
import { User } from "../../entity/User";
import bcrypt from "bcryptjs"
import { Resolver, Query, Arg, Mutation, ObjectType, Field} from "type-graphql";
import { RegisterInput } from "./validation";

@ObjectType()
class FieldError{
  @Field()
  field: string;
  @Field()
  message: string
}

@ObjectType()
class UserResponse{
  @Field(()=>[FieldError], {nullable:true})
  errors?: FieldError[];
  @Field(()=>User, {nullable:true})
  user?: User
}

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

@Mutation(() => UserResponse)
async login(
  @Arg("input") {username, password}: RegisterInput)
  : Promise<UserResponse>
{
  const user = await User.findOne({ where: { username } })
  if(!user){
    return{
      errors:[{
        field: "username",
        message:"User with this username does not exist"
      }]
    }
  }
const checkPassword = await bcrypt.compare(password, user.password)
if(!checkPassword){
  return{
    errors:[{
      field: "password",
      message:"Invalid password"
    }]
  }
}
  return {user}
}
}
