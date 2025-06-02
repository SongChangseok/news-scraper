import "dotenv/config";
import { handler } from "./api/slack.js";

(async () => {
  await handler.start(process.env.PORT || 3000);
  console.log("⚡ Slack bot is running");
})();
