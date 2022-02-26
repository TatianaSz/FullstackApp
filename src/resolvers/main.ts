
import { Post } from "src/entity/Post";
import { Resolver, Query } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts() {
    return "posts";
  }
}
