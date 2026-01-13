import { Queue } from "bullmq";
import { bullRedis } from "../config/bullmq.redis";

export const newsQueue = new Queue("news-scraper", {
  connection: bullRedis,
});
