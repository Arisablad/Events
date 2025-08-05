import cors from 'cors'
import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import { promises as fs } from 'fs'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT =
  process.env.PORT || (process.env.NODE_ENV === 'production' ? undefined : 4000)

console.log(`Mock API running at `)

// File path for storing events
const eventsFilePath = path.resolve(process.cwd(), 'mock', 'events.json')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../dist')))
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  },
})
const upload = multer({ storage })

const readEventsFromFile = async (): Promise<any[]> => {
  try {
    const data = await fs.readFile(eventsFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading events file:', error)
    return []
  }
}

const writeEventsToFile = async (events: any[]): Promise<void> => {
  try {
    await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2))
  } catch (error) {
    console.error('Error writing to events file:', error)
  }
}

// Routes
app.get('/api/events', async (_req: Request, res: Response) => {
  const events = await readEventsFromFile()
  res.json(events)
})

app.get('/api/event/:id', async (req: Request, res: Response) => {
  const events = await readEventsFromFile()
  const event = events.find((e: { id: string }) => e.id === req.params.id)

  if (event) {
    res.json(event)
  } else {
    res.status(404).send({ error: 'Event not found' })
  }
})

app.post(
  '/api/events/create',
  upload.array('images'),
  async (req: Request, res: Response) => {
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
  },
)

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' })
  }

  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})
