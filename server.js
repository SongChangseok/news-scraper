import "dotenv/config";
import { slackHandler } from "./api/slackHandler.js";

(async () => {
  await slackHandler.start(process.env.PORT || 3000);
  console.log("⚡ Slack bot is running");
})();
