import fs from "fs/promises";
import * as cheerio from "cheerio";

async function main() {
  const html = await fs.readFile(__dirname + "/systememarketing.html").then((d) => d.toString());
  const $ = cheerio.load(html);

  const result: Record<string, string>[] = [];

  $("ol > li").each((_, e) => {
    const [quote, author] = $(e).text().split("–");
    result.push({ quote: quote.replaceAll("«", "").replaceAll("»", "").trim(), author: author?.trim() });
  });

}

main().then();
