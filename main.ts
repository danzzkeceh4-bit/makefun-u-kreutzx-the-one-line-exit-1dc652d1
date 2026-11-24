import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Output contract: exactly one line, 1-140 chars, no trailing newline,
// written to <MAKEFUN_OUTPUT_DIR>/entry.txt (default /output).
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = "entry.txt";

const ENTRY =
  "I resign, effective immediately: the office plant got promoted twice while I watered it, and I refuse to take orders from a fern.";

const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 140) {
  throw new Error(`entry must be 1-140 characters, got ${codePoints}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, OUTPUT_FILE);
writeFileSync(outPath, ENTRY, "utf8");

const readBack = readFileSync(outPath, "utf8");
if (readBack !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match expected text");
}
