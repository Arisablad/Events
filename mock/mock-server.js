import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs/promises'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000
const eventsFilePath = path.resolve(process.cwd(), 'mock', 'events.json')

console.log('Starting server...')
console.log('Port:', PORT)
console.log('Environment:', process.env.NODE_ENV)
console.log('Working directory:', process.cwd())

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(process.cwd(), 'dist')))

app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')))

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'public/uploads'),
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  },
})
const upload = multer({ storage })

const readEventsFromFile = async () => {
  try {
    const data = await fs.readFile(eventsFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading events file:', error)
    return []
  }
}

const writeEventsToFile = async (events) => {
  try {
    await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2))
  } catch (error) {
    console.error('Error writing to events file:', error)
  }
}

// API Routes
app.get('/api/events', async (_req, res) => {
  console.log('GET /api/events')
  const events = await readEventsFromFile()
  res.json(events)
})

app.get('/api/event/:id', async (req, res) => {
  console.log('GET /api/event/:id', req.params.id)
  const events = await readEventsFromFile()
  const event = events.find((e) => e.id === req.params.id)

  if (event) {
    res.json(event)
  } else {
    res.status(404).send({ error: 'Event not found' })
  }
})

app.post('/api/events/create', upload.array('images'), async (req, res) => {
  console.log('POST /api/events/create')
  const { body, files } = req
  const events = await readEventsFromFile()

  const newEvent = {
    id: uuidv4(),
    ...body,
    images: (files || []).map((file) => `/uploads/${file.filename}`),
  }

  events.push(newEvent)
  await writeEventsToFile(events)
  res.status(201).json(newEvent)
})

app.get('*', (req, res) => {
  console.log('Serving frontend for:', req.path)

  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' })
  }

  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 Mock API running on port ${PORT}`)
  console.log(
    `📁 Serving static files from: ${path.join(process.cwd(), 'dist')}`,
  )
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`📂 Current working directory: ${process.cwd()}`)
})
