import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import slackHandler from './api/slack.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/api/slack', (req, res) => {
  slackHandler(req, res)
})

app.listen(PORT, () => {
  console.log(`✅ 로컬 테스트 서버 실행 중: http://localhost:${PORT}/api/slack`)
})
