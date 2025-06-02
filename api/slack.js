// import { App } from "@slack/bolt";
import { scrapeNews } from "../news/scraper.js";
import { summarizeArticles } from "../gpt/summarize.js";
import { saveToNotion } from "../notion/notionClient.js";

// const slackHandler = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
// });

// slackHandler.message(async ({ message, say }) => {
//   if (message.subtype === "bot_message") return;

//   const topic = message.text.trim();
//   await say(`"${topic}"에 대한 뉴스를 수집하고 요약하는 중입니다...`);

//   try {
//     const articles = await scrapeNews(topic);
//     const summaries = await summarizeArticles(articles);
//     await saveToNotion(topic, summaries);
//     await say(`"${topic}"에 대한 뉴스 요약이 노션에 저장되었습니다 ✅`);
//   } catch (err) {
//     console.error("에러 발생:", err);
//     await say("뉴스 요약 도중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
//   }
// });

export async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  // Slack Challenge 응답
  if (req.body?.type === "url_verification") {
    return res.status(200).json({ challenge: req.body.challenge });
  }

  const topic = req.body?.event?.text || "";
  if (req.body.event?.type === "app_mention") {
    const articles = await scrapeNews(topic);
    const summaries = await summarizeArticles(articles);
    await saveToNotion(topic, summaries);
  }

  res.status(200).send("ok");
}
