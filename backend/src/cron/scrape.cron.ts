import cron from "node-cron";
import { SOURCES } from "../constants/sources";
import { newsQueue } from "../queues/news.queue";

cron.schedule("*/30 * * * *", async () => {
  for (const [category, urls] of Object.entries(SOURCES)) {
    for (const url of urls) {
      await newsQueue.add("scrape", {
        category,
        url,
      });
    }
  }
});
