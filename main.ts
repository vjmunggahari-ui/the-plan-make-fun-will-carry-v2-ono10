import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The plan: one text, 1-280 Unicode code points, written deterministically.
const PLAN =
  "PriceSprint: sell Shopify stores a 48-hour pricing report for $149: " +
  "their top 20 products vs 5 rivals, with repricing moves. " +
  "Cold-email stores a free 3-product sample. " +
  "Day 1: build the template, email 50 stores, take payment by Stripe link. " +
  "At 2% close, day 1 alone makes $298.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");

// Self-check: the entry must be 1-280 Unicode code points, not whitespace only.
// Counting code points (not UTF-16 units) matches the competition's rule.
const codePoints = [...PLAN].length;
if (codePoints < 1 || codePoints > 280 || PLAN.trim().length === 0) {
  throw new Error(`entry length ${codePoints} code points is outside 1-280`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), PLAN, "utf8");
