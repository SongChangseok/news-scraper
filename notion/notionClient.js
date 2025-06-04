import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function saveToNotion(topic, summaries) {
  for (const item of summaries) {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB_ID },
      properties: {
        제목: { title: [{ text: { content: item.title } }] },
        url: { url: item.link },
        // 키워드: {multi_select: item.keywords.map(keyword => ({ name: keyword })) },
        요약: { rich_text: [{ text: { content: item.summary } }] },
      },
    });
  }
}
