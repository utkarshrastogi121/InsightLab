import { Worker } from "bullmq";
import { scrapeCategory } from "../scrapers/scrapeCategory";
import News from "../models/News";
import redisClient from "../config/redis";
import { bullRedis } from "../config/bullmq.redis";

new Worker(
  "news-scraper",
  async (job) => {
    const { category, url } = job.data;

    console.log(`📰 Scraping ${category}`);

    const articles = await scrapeCategory(url, category);

    for (const article of articles) {
      await News.updateOne(
        { url: article.url },
        { $setOnInsert: article },
        { upsert: true }
      );
    }

    await redisClient.del(`news:${category}`);

    return { inserted: articles.length };
  },
  {
    connection: bullRedis,
    concurrency: 3,
  }
);
