import { Length, IsEmail, MinLength } from "class-validator";
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
    @MinLength(5)
    password: string;
}

@InputType()
export class LoginInput {
    @Field()
    @MinLength(1)
    loginType: string
    
    @Field()
    @MinLength(5)
    password: string;
}