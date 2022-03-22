import { User } from "../../entity/User";
import bcrypt from "bcryptjs";
import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { LoginInput, RegisterInput } from "./validation";
import { OwnValidationError } from "../../errors";
import { TContext } from "../../types/Context";

declare module "express-session" {
  interface SessionData {
    userId: any;
  }
}
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

  @Mutation(() => User)
  async createUser(
    @Arg("input") { username, email, password }: RegisterInput
  ): Promise<User> {
    const hashed = await bcrypt.hash(password, 14);
    const user = await User.create({
      username,
      email,
      password: hashed,
    }).save();
    return user;
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
