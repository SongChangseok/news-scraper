// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // 환경 변수에 키 설정

// export async function summarizeArticles(articles) {
//   const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });

//   const summaries = await Promise.all(
//     articles.map(async (article) => {
//       const prompt = `다음 기사를 간결하게 요약해줘:\n\n제목: ${article.title}\n\n본문: ${article.content}`;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const text = response.text();

//       return {
//         ...article,
//         summary: text,
//       };
//     })
//   );

//   return summaries;
// }

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // 환경 변수에 API 키 설정
});

export async function summarizeArticles(articles) {
  const summaries = await Promise.all(
    articles.map(async (article) => {
      const response = await ai.models.generateContent({
        model: "gemini-pro",
        prompt: `다음 기사를 간결하게 요약해줘:\n\n제목: ${article.title}\n\n본문: ${article.content}`,
      });

      const text = response.text();

      return {
        ...article,
        summary: text,
      };

      //   const prompt = `다음 기사를 간결하게 요약해줘:\n\n제목: ${article.title}\n\n본문: ${article.content}`;

      //   const result = await model.generateContent(prompt);
      //   const response = await result.response;
      //   const text = response.text();

      //   return {
      //     ...article,
      //     summary: text,
      //   };
    })
  );

  return summaries;
}
