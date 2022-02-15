import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entieties/Post";
import ormConfig from "./mikro-orm.config"

const main = async() =>{
    const orm =  await MikroORM.init(ormConfig);

}
main()