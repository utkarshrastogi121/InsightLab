import IORedis from "ioredis";

const REDIS_HOST = process.env.REDIS_HOST!;
const REDIS_PORT = process.env.REDIS_PORT
  ? Number(process.env.REDIS_PORT)
  : 14600;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD!;

export const bullRedis = new IORedis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

bullRedis.on("connect", () => {
  console.log("BullMQ Redis connected");
});

bullRedis.on("error", (err) => {
  console.error("BullMQ Redis error:", err);
});
