import cors from 'cors'
import express from 'express'
import fs from 'fs/promises'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000

console.log('Starting simplified server...')
console.log('PORT:', PORT)

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(process.cwd(), 'dist')))
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), 'public/uploads')
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  },
})
const upload = multer({ storage })

const eventsFilePath = path.join(process.cwd(), 'mock', 'events.json')

app.get('/api/events', async (req, res) => {
  try {
    const data = await fs.readFile(eventsFilePath, 'utf-8')
    res.json(JSON.parse(data))
  } catch (error) {
    console.error('Error reading events:', error)
    res.json([])
  }
})

app.get('/api/events/:id', async (req, res) => {
  try {
    const data = await fs.readFile(eventsFilePath, 'utf-8')
    const events = JSON.parse(data)
    const event = events.find((e) => e.id === req.params.id)

    if (event) {
      res.json(event)
    } else {
      res.status(404).json({ error: 'Event not found' })
    }
  } catch (error) {
    console.error('Error reading event:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/api/events', upload.array('images'), async (req, res) => {
  try {
    const data = await fs.readFile(eventsFilePath, 'utf-8')
    const events = JSON.parse(data)

    const newEvent = {
      id: uuidv4(),
      ...req.body,
      images: (req.files || []).map((file) => `/uploads/${file.filename}`),
    }

    events.push(newEvent)
    await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2))

    res.status(201).json(newEvent)
  } catch (error) {
    console.error('Error creating event:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.use('*', (req, res) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' })
  }

  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
