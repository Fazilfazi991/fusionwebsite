import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../app/kaam/delete-account/kaam-delete-account-client.tsx", import.meta.url), "utf8");

assert.match(source, /signInWithOtp\([\s\S]*shouldCreateUser:\s*false/, "Deletion OTP must only authenticate an existing KAAM user.");
assert.match(source, /functions\.invoke\("delete-account"\)/, "Deletion must reuse the authenticated delete-account Edge Function.");
assert.doesNotMatch(source, /userId|user_id|profileId|profile_id/, "The browser must not nominate a target account.");
assert.match(source, /auth\.signOut\(\{ scope: "local" \}\)/, "The browser session must be cleared after deletion.");

console.log("KAAM deletion client contract: PASS");
