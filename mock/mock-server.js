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
const PORT = process.env.PORT || 10000

// Fix the events file path - for Render deployment
let eventsFilePath
if (process.env.NODE_ENV === 'production') {
  // In production, create the events file in a writable directory
  eventsFilePath = path.resolve(process.cwd(), 'events.json')
} else {
  // In development, use the mock directory
  eventsFilePath = path.resolve(__dirname, '..', '..', 'mock', 'events.json')
}

console.log('Events file path:', eventsFilePath)
console.log('Current working directory:', process.cwd())
console.log('__dirname:', __dirname)

app.use(cors())
app.use(express.json())
// Serve static files from the dist directory
const distPath = path.join(process.cwd(), 'dist')
console.log('Serving static files from:', distPath)
app.use(express.static(distPath))

// Serve the React app for any non-API routes
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' })
  }

  const indexPath = path.join(distPath, 'index.html')
  console.log('Serving index.html from:', indexPath)
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err)
      res.status(500).send('Error loading the application')
    }
  })
})
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
    console.log('Events file not found, creating with empty array')
    console.log('Error details:', error.message)
    // Create the file with empty array if it doesn't exist
    try {
      await writeEventsToFile([])
      return []
    } catch (writeError) {
      console.error('Failed to create events file:', writeError.message)
      // Return empty array if we can't write to disk
      return []
    }
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mock API running at http://localhost:${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log('Server is ready to handle requests')
  console.log('Available routes:')
  console.log('  GET /health')
  console.log('  GET /api/events')
  console.log('  GET /api/event/:id')
  console.log('  POST /api/events/create')
})
