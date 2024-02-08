import { rdbClient } from "@loaders/database.loader";
import User from "@my-rdb/entities/user.entity";

export const UserRepository = rdbClient.getRepository(User);
