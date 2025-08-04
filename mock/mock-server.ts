import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Static files (uploads)
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

// In-memory events store
let events = [
  {
    id: uuidv4(),
    title: 'Sample Event',
    date: '2025-10-01T18:00:00.000Z',
    description: 'This is a sample event description.',
    images: ['/uploads/sample-image.jpg'],
    event_type: 'CULTURE',
    phone_number: '+1234567890',
    email: 'sample@example.com',
    location: 'Sample City',
  },
]

// Routes

app.get('/events', (_, res) => {
  res.json(events)
})

app.get('/event/:id', (req, res) => {
  const event = events.find((e) => e.id === req.params.id)
  if (event) {
    res.json(event)
  } else {
    res.status(404).send({ error: 'Event not found' })
  }
})

app.post('/add', upload.array('images'), (req, res) => {
  const { body, files } = req

  const newEvent = {
    id: uuidv4(),
    ...body,
    images: (files as Express.Multer.File[]).map(
      (file) => `/uploads/${file.filename}`,
    ),
  }

  events.push(newEvent)

  res.status(201).json(newEvent)
})

app.listen(PORT, () => {
  console.log(`✅ Mock API running at http://localhost:${PORT}`)
})
