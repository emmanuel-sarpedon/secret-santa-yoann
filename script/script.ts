import quotes from "../src/constants/quotes";
import fs from "fs/promises";
import {shuffle} from "@/lib/utils";

async function main() {
  const arr = quotes.sort((a, b) => a.quote.localeCompare(b.quote));
  await fs.writeFile(__dirname + "/../src/constants/quotes_v2.ts", JSON.stringify(shuffle(arr)));
}

main().then();
