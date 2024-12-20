import fs from "fs/promises";
import * as cheerio from "cheerio";

async function main() {
  const html = await fs.readFile(__dirname + "/canva.html").then((d) => d.toString());
  const $ = cheerio.load(html);

  const quotes: string[] = [];
  const authors: string[] = [];

  $("span.aCjIzEs.bGoyZKu").each((_, e) => {
    quotes.push($(e).text().replaceAll('"', "").replaceAll("“", ""));
  });

  $("p.eQXNtvq.SoZXO0s span:not(.aCjIzEs.bGoyZKu)").each((_, e) => {
    authors.push($(e).text());
  });

}

main().then();
