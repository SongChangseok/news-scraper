export const extractJsonFromMarkdown = (str) => {
  const regex = /```json\s*([\s\S]*?)\s*```/
  const match = str.match(regex)
  if (match && match[1]) {
    try {
      return JSON.parse(match[1])
    } catch (e) {
      console.error('Failed to parse JSON from markdown:', e)
      return null
    }
  }
  return null
}

export const createPrompt = (articles) => `
        # 뉴스 기사 요약

        ## 목표
        - 다음 뉴스 기사들을 요약하고, 아래 JSON 형식에 맞게 정리해 주세요.

        ## 요약 시 유의사항:
        - 각 기사마다 핵심 내용을 2~3문장으로 요약
        - category는 ["정치", "경제", "사회", "국제", "문화", "과학/기술", "스포츠", "환경"] 중 선택
        - category는 위 정렬대로 기입
        - pubDate는 YYYY-MM-DD 형식 유지
        - 출력은 아래 형식의 JSON 배열로 반환
        - 요약 결과를 아래 형식의 JSON 배열로만 응답해주세요. 텍스트나 설명 없이 JSON만 반환

        ## 출력 형식:
        [
          {
            "title": "기사 제목",
            "url": "https://example.com/news1",
            "pubDate": "2025-06-03",
            "category": ["경제"],
            "summary": "핵심 내용 요약"
          }
        ]

        ## 기사 리스트:
        ${JSON.stringify(articles)}
      `
