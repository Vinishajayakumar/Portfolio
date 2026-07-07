import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running' })
})

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields.' })
  }

  console.log(`New contact from ${name} <${email}>: ${message}`)

  return res.json({ success: true, message: 'Thanks for reaching out! I will get back to you soon.' })
})

app.use(express.static(path.join(__dirname, 'frontend', 'dist')))

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
