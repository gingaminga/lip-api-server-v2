import container from "@config/inversify.config";
import RedisClient from "@my-redis/client";
import INVERSIFY_TYPES from "@utils/invesify-type";

export const redisClient = container.get<RedisClient>(INVERSIFY_TYPES.RedisClient);
