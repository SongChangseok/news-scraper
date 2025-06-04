import Parser from 'rss-parser'

const parser = new Parser()

export async function scrapeNews(topic) {
  const feed = await parser.parseURL(
    `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=ko`
  )

  return feed.items.slice(0, 10)
}
