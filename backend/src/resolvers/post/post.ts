import { Post } from "../../entity/Post";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { OwnValidationError } from "../../errors";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number): Promise<Post | undefined> {
    return Post.findOne({ where: { id } });
  }

  @Mutation(() => Post)
  createPost(@Arg("name") name: string): Promise<Post> {
    return Post.create({ name }).save();
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("id") id: number,
    @Arg("name", { nullable: true }) name: string
  ): Promise<Post> {
    const post = await Post.findOne({ where: { id } });
    if (!post)
      throw new OwnValidationError(
        "POST_NOT_FOUND",
        "post",
        "doesPostExist",
        "Post not found"
      );
    if (!name)
      throw new OwnValidationError(
        "EMPTY_TITLE",
        "title",
        "isTitle",
        "Provide a new title"
      );
    post.name = name;
    await post.save();
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    const post = await Post.findOne({ where: { id } });
    if (!post)
      throw new OwnValidationError(
        "POST_NOT_FOUND",
        "post",
        "doesPostExist",
        "Post not found"
      );
    await post.remove();
    return true;
  }
}
