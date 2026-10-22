import fs from "node:fs";
import { decode } from "next-auth/jwt";
const env = fs.readFileSync("/Users/mrrayan07/Downloads/Pavan_notes/.env", "utf8");
const secret = env.match(/^AUTH_SECRET=(.+)$/m)[1].trim();
for (const [file, expect] of [["cookie-on.txt", 180], ["cookie-off.txt", 1]]) {
  const t = await decode({ secret, salt: "authjs.session-token", token: fs.readFileSync(`/tmp/opencode/keepauth/${file}`, "utf8") }).catch(e => "ERR " + e.message);
  console.log(file, "->", t && typeof t === "object" ? Math.round((t.exp - t.iat) / 86400) + " days (expect " + expect + ")" : t);
}
