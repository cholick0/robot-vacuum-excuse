// The Robot Vacuum's Funniest Excuse — make.fun entry.
// Writes one line: the excuse a robot vacuum gives for missing a spot.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MIN_CHARS = 1;
const MAX_CHARS = 120;
const OUT_PATH = "/output/entry.txt";

const ENTRY =
  "I skipped that spot — the dust bunny living there pays rent, and honestly it tidies better than I do.";

function validateEntry(text: string): void {
  const length = [...text].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");
  // Read the file back byte-for-byte and confirm it is exactly what we wrote.
  const readBack = readFileSync(OUT_PATH);
  const expected = Buffer.from(ENTRY, "utf8");
  if (!readBack.equals(expected)) {
    throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
  }
  console.log(
    `wrote ${[...ENTRY].length} characters (${expected.length} bytes) to ${OUT_PATH}, read-back verified`,
  );
}

main();
