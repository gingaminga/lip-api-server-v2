import { rdbUtil } from "@loaders/util.loader";
import User from "@my-rdb/entities/user.entity";

export const UserRepository = rdbUtil.getRepository(User);
