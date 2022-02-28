
import { Post } from "../entity/Post";
import { Resolver, Query, Arg, Mutation} from "type-graphql";

@Resolver()
export class PostResolver {

  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, {nullable:true})
  post(
    @Arg("id") id: number)
    : Promise<Post | undefined> {
    return Post.findOne({ where: { id } });
  }

  @Mutation(()=>Post)
  createPost(
    @Arg("name") name: string)
  {
    return Post.create({name}).save()
  }
}
