import { OpenAI } from "openai";

export async function summarizeArticles(articles) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return Promise.all(
    articles.map(async (article) => {
      const prompt = `다음 뉴스 내용을 3문장 이내로 요약해줘:\n"${article.content}"`;
      const res = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });
      return { ...article, summary: res.choices[0].message.content };
    })
  );
}
