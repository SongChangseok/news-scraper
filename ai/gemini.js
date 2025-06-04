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

import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // 환경 변수에 API 키 설정
})

export async function summarizeArticles(articles) {
  const summaries = await Promise.all(
    articles.map(async (article) => {
      // const prompt = `다음 기사를 간결하게 요약해줘:\n\n제목: ${article.title}\n\n본문: ${article.content}`

      const prompt = `
        다음 뉴스 기사들을 요약하고, 아래 JSON 형식에 맞게 정리해 주세요.

        요약 시 유의사항:
        - 각 기사마다 핵심 내용을 2~3문장으로 요약
        - category는 ["경제", "증시", "산업", "기술", "국제", "정책"] 중 선택
        - pubDate는 YYYY-MM-DD 형식 유지
        - 출력은 아래 형식의 JSON 배열로 반환
        - category는 아래 목록 중 가장 적절한 것으로 설정하세요: 
          ["정치", "경제", "사회", "국제", "문화", "과학/기술", "스포츠", "환경"]

        [
          {
            "title": "기사 제목",
            "url": "https://example.com/news1",
            "pubDate": "2025-06-03",
            "category": ["경제"],
            "summary": "핵심 내용 요약"
          }
        ]

        기사 리스트:
        ${JSON.stringify(articles)}
      `
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ text: prompt }],
      })

      return {
        ...article,
        summary: response.text,
      }
    })
  )
  console.log('gemini::', summaries)
  return summaries
}
