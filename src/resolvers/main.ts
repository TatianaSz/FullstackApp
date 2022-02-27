
import { Post } from "../entity/Post";
import { Resolver, Query } from "type-graphql";

@Resolver()
export class PostResolver {

  @Query(() => [Post])
  posts() {
    return Post.find();
  }
}
