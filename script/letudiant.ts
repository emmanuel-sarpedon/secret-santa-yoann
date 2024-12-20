import fs from "fs/promises";
import * as cheerio from "cheerio";

async function main() {
  const html = await fs.readFile(__dirname + "/letudiant.html").then((d) => d.toString());
  const $ = cheerio.load(html);

  const result: Record<string, string>[] = [];

  $("p > i").each((i, e) => {
    if (i < 3) return;
    if (i > 102) return;
    const [quote, author] = $(e).text().split("»");
    result.push({ quote: quote.replaceAll("«", "").replaceAll("″", "").replace(/\d/g, "").trim(), author: author.replaceAll("–", "").trim() });
  });

  console.log(result);
}

main().then();
