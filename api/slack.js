// api/slack-events.js
import { scrapeNews } from "../news/scraper.js";
import { summarizeArticles } from "../gpt/summarize.js";
import { saveToNotion } from "../notion/notionClient.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const body = req.body;

  // Slack URL 인증 처리
  if (body.type === "url_verification") {
    return res.status(200).json({ challenge: body.challenge });
  }

  // 슬랙 이벤트 처리
  if (body.event && body.event.type === "app_mention") {
    const topic = body.event.text.replace(/<@[^>]+>\s*/, "").trim();
    const channel = body.event.channel;

    // 슬랙에 응답 메시지 보내기
    const sendSlackMessage = async (text) => {
      await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channel, text }),
      });
    };

    await sendSlackMessage(
      `🔍 "${topic}" 관련 뉴스를 수집하고 요약 중입니다...`
    );

    try {
      const articles = await scrapeNews(topic);
      const summaries = await summarizeArticles(articles);
      await saveToNotion(topic, summaries);
      await sendSlackMessage(
        `✅ "${topic}" 관련 뉴스가 노션에 저장되었습니다.`
      );
    } catch (error) {
      await sendSlackMessage(
        `❌ 오류 발생\n\`\`\`${JSON.stringify(
          error,
          Object.getOwnPropertyNames(error),
          2
        )}\`\`\``
      );
    }
  }

  return res.status(200).end();
}

export const config = {
  api: {
    bodyParser: true,
  },
};
