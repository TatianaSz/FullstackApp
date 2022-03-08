import { Length, IsEmail } from "class-validator";
import { isEmailUsed } from "../../validators/isEmailUsed";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
    @Field()
    @Length(1,30)
    username: string;

    @Field()
    @IsEmail()
    @isEmailUsed({
        message: 'Email is already in use',
      })
    email: string;
    
    @Field()
    password: string;
}

@InputType()
export class LoginInput {
    @Field()
    loginType: string
    
    @Field()
    password: string;
}