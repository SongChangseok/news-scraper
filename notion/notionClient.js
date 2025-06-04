import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function saveToNotion(topic, summaries) {
  for (const item of summaries) {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB_ID },
      properties: {
        title: { title: [{ text: { content: item.title } }] },
        url: { url: item.url },
        pubDate: { date: { start: item.pubDate } },
        category: { multi_select: item.category.map((name) => ({ name })) },
        summary: { rich_text: [{ text: { content: item.summary } }] },
      },
    })
  }
}
