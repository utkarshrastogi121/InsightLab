import { createClient, RedisClientType } from "redis";

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 14600;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

if (!REDIS_HOST || !REDIS_PASSWORD) {
  throw new Error("Missing Redis environment variables");
}

const redisClient: RedisClientType = createClient({
  username: "default",
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("error", (err) => console.error("Redis error:", err));

await redisClient.connect();

export default redisClient;
