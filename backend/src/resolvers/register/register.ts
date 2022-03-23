import { User } from "../../entity/User";
import bcrypt from "bcryptjs";
import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { ErrorObj, LoginInput, RegisterInput, UserResponse } from "./input";
import { OwnValidationError } from "../../errors";
import { TContext } from "../../types/Context";
import { isMin } from "../validators";

declare module "express-session" {
  interface SessionData {
    userId: any;
  }
}

let UserErrors: Array<ErrorObj> = [];

@Resolver()
export class RegisterResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  async savedUsers(@Ctx() ctx: TContext) {
    if (!ctx.req.session!.userId) {
      return undefined;
    }
    const user = await User.findOne(ctx.req.session.userId);
    return user;
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Arg("input") { username, email, password }: RegisterInput
  ): Promise<UserResponse> {
    UserErrors = [];
    isMin(
      username,
      5,
      {
        field: "username",
        message: "Username has to be longer than 5 characters!",
      },
      UserErrors
    );
    isMin(
      email,
      5,
      {
        field: "email",
        message: "Email has to be longer than 5 characters!",
      },
      UserErrors
    );
    if (UserErrors.length >= 1) {
      return { errorArr: UserErrors };
    }
    const hashed = await bcrypt.hash(password, 14);
    const user = await User.create({
      username,
      email,
      password: hashed,
    }).save();
    return { user };
  }

  @Mutation(() => User)
  async login(
    @Arg("input") { loginType, password }: LoginInput,
    @Ctx() ctx: TContext
  ): Promise<User> {
    const user = await User.findOne({
      where: [{ username: loginType }, { email: loginType }],
    });

    if (!user) {
      throw new OwnValidationError(
        "LOGIN_FAILED",
        "username",
        "doesUserExist",
        "User not found"
      );
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new OwnValidationError(
        "LOGIN_FAILED",
        "password",
        "isValidPassword",
        "Invalid password"
      );
    }

    ctx.req.session.userId = user.id;
    return user;
  }
}
