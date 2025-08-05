import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { promises as fs } from 'fs'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000

// File path for storing events
const eventsFilePath = path.resolve(process.cwd(), 'mock', 'events.json')

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: (_, file, cb) => {
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

const writeEventsToFile = async (events: any[]) => {
  try {
    await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2))
  } catch (error) {
    console.error('Error writing to events file:', error)
  }
}

// Routes

app.get('/api/events', async (_, res) => {
  const events = await readEventsFromFile()

  res.json(events)
})

app.get('/api/event/:id', async (req, res) => {
  const events = await readEventsFromFile()

  const event = events.find((e: any) => e.id === req.params.id)

  if (event) {
    res.json(event)
  } else {
    res.status(404).send({ error: 'Event not found' })
  }
})

app.post('/api/events/create', upload.array('images'), async (req, res) => {
  const { body, files } = req
  const events = await readEventsFromFile()

  const newEvent = {
    id: uuidv4(),
    ...body,
    images: (files as Express.Multer.File[]).map(
      (file) => `/uploads/${file.filename}`,
    ),
  }

  events.push(newEvent)

  await writeEventsToFile(events)

  res.status(201).json(newEvent)
})

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})
