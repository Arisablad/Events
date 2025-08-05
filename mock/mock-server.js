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
const PORT = process.env.PORT || 10000 // Changed to match your log

// Fix the events file path - go up two levels from dist/mock to reach project root
const eventsFilePath = path.resolve(
  __dirname,
  '..',
  '..',
  'mock',
  'events.json',
)

console.log('Events file path:', eventsFilePath) // Debug log

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'dist')))
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')))

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join(process.cwd(), 'public/uploads')
    try {
      await fs.mkdir(dir, { recursive: true })
      cb(null, dir)
    } catch (error) {
      cb(error)
    }
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  },
})
const upload = multer({ storage })

const readEventsFromFile = async () => {
  try {
    // Check if file exists first
    await fs.access(eventsFilePath)
    const data = await fs.readFile(eventsFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.log('Events file not found or empty, creating with empty array')
    // Create the file with empty array if it doesn't exist
    await writeEventsToFile([])
    return []
  }
}

const writeEventsToFile = async (events) => {
  try {
    // Ensure the directory exists
    const dir = path.dirname(eventsFilePath)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2))
  } catch (error) {
    console.error('Error writing to events file:', error)
  }
}

app.get('/api/events', async (_req, res) => {
  try {
    const events = await readEventsFromFile()
    res.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({ error: 'Failed to fetch events' })
  }
})

app.get('/api/event/:id', async (req, res) => {
  try {
    const events = await readEventsFromFile()
    const event = events.find((e) => e.id === req.params.id)

    if (event) {
      res.json(event)
    } else {
      res.status(404).json({ error: 'Event not found' })
    }
  } catch (error) {
    console.error('Error fetching event:', error)
    res.status(500).json({ error: 'Failed to fetch event' })
  }
})

app.post('/api/events/create', upload.array('images'), async (req, res) => {
  try {
    const { body, files } = req
    const events = await readEventsFromFile()

    const newEvent = {
      id: uuidv4(),
      ...body,
      images: files ? files.map((file) => `/uploads/${file.filename}`) : [],
    }

    events.push(newEvent)
    await writeEventsToFile(events)
    res.status(201).json(newEvent)
  } catch (error) {
    console.error('Error creating event:', error)
    res.status(500).json({ error: 'Failed to create event' })
  }
})

// Add a simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log('Server is ready to handle requests')
})
