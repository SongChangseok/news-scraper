import Parser from 'rss-parser'

const parser = new Parser()

const scoreRelatedness = (text, topic) => (text.match(new RegExp(topic, 'gi')) || []).length

export async function scrapeNews(topic) {
  const feed = await parser.parseURL(
    `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=ko`
  )

  console.log(feed.items)

  return feed.items.slice(0, 20)
}
