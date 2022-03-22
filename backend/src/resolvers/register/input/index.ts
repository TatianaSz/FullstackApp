import { User } from "../../../entity/User";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class ErrorObj {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [ErrorObj], { nullable: true })
  errorArr?: ErrorObj[];
}

@InputType()
export class RegisterInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  loginType: string;

  @Field()
  password: string;
}
