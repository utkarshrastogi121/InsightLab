import puppeteer from "puppeteer";

export const scrapeCategory = async (url: string, category: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const articles = await page.evaluate(() => {
    const items: any[] = [];
    document.querySelectorAll("article").forEach((el) => {
      const title = el.querySelector("h2,h3")?.textContent;
      const link = el.querySelector("a")?.href;

      if (title && link) {
        items.push({
          title,
          url: link,
          description: "",
        });
      }
    });
    return items;
  });

  await browser.close();

  return articles.map(a => ({
    ...a,
    category,
    scrapedAt: new Date(),
  }));
};
