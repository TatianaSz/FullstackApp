import { User } from "../../entity/User";
import bcrypt from "bcryptjs";
import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { ErrorObj, LoginInput, RegisterInput, UserResponse } from "./input";
import { OwnValidationError } from "../../errors";
import { TContext } from "../../types/Context";
import { isEmail, isMin, isUsed } from "../validators";
import { randomBytes } from "crypto";
import { UserToken } from "../../entity/Token";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

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
    @Ctx() ctx: TContext,
    @Arg("input") { username, email, password }: RegisterInput
  ): Promise<UserResponse> {
    UserErrors = [];
    isMin(username, "Username", 4, UserErrors);
    isMin(password, "Password", 6, UserErrors);
    isEmail(email, "Email", UserErrors);
    await isUsed(email, "Email", UserErrors);
    if (UserErrors.length >= 1) {
      return { errorArr: UserErrors };
    }
    const hashed = await bcrypt.hash(password, 14);
    const newToken = randomBytes(16);
    const user = await User.create({
      username,
      email,
      validated: false,
      password: hashed,
    }).save();
    const token = await UserToken.create({
      token: newToken,
      userId: user.id,
    }).save();

    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: "private key ;p",
      })
    );
    var mailOptions = {
      from: "plikichmura777@gmail.com",
      to: user.email,
      subject: "Account Verification Link",
      text:
        "Hello " +
        ctx.req.body.name +
        ",\n\n" +
        "Please verify your account by clicking the link: \nhttp://" +
        // ctx.req.headers.host +
        "/confirmation/" +
        user.email +
        "/" +
        //  token.token +
        "\n\nThank You!\n",
    };
    transporter.sendMail(mailOptions);

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
