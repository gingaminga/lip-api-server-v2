import relationDBOption from "@config/orm.config";
import RelationDBClient from "@my-rdb/client";
import RedisClient from "@my-redis/client";

export const rdbClient = new RelationDBClient(relationDBOption);
export const redisClient = new RedisClient();
