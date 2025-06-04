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

async function listAvailableModels() {
  try {
    const models = await ai.models.list();
    console.log("사용 가능한 모델 목록:");
    for await (const model of models) {
      console.log(`- ${model.name}`);
      if (
        model.supportedMethods &&
        model.supportedMethods.includes("generateContent")
      ) {
        console.log(`  (generateContent 지원)`);
      }
    }
  } catch (error) {
    console.error("모델 목록을 불러오는 중 오류 발생:", error);
  }
}

// 이 함수를 호출하여 모델 목록을 확인하세요.
listAvailableModels();

export async function summarizeArticles(articles) {
  const summaries = await Promise.all(
    articles.map(async (article) => {
      const prompt = `다음 기사를 간결하게 요약해줘:\n\n제목: ${article.title}\n\n본문: ${article.content}`;
      const response = await ai.models.generateContent({
        model: "gemini-pro",
        contents: [{ text: prompt }],
      });

      const text = response.text();

      return {
        ...article,
        summary: text,
      };
    })
  );

  return summaries;
}
