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
    event_type: 'Culture',
    phone_number: '+1234567890',
    email: 'sample@example.com',
    location: 'Sample City',
  },
  {
    id: uuidv4(),
    title:
      'Long event title that exceeds the usual length for testing purposes.',
    date: '2025-11-01T18:00:00.000Z',
    description: 'This is another sample event description.',
    images: ['/uploads/another-image.jpg'],
    event_type: 'Sport',
    phone_number: '+0987654321',
    email: 'another@example.com',
    location: 'Another City',
  },
  {
    id: uuidv4(),
    title: 'Third Event',
    date: '2025-12-01T18:00:00.000Z',
    description: `
    Long Description for the third event. This event is about technology and innovation. It will feature various speakers and workshops related to the latest trends in tech.
    Join us for an exciting day filled with knowledge sharing and networking opportunities. Don't miss out on
    the chance to learn from industry experts and connect with like-minded individuals.
    `,
    images: [],
    event_type: 'Health',
    phone_number: '+1122334455',
    email: 'third@example.com',
    location: 'Third City',
  },
  {
    id: uuidv4(),
    title: 'Fourth Event',
    date: '2025-12-15T18:00:00.000Z',
    description: 'This is a fourth sample event description.',
    images: [],
    event_type: 'Health',
    phone_number: '+5566778899',
    email: 'fourth@example.com',
    location: 'Fourth City',
  },
]

// Routes

app.get('/api/events', (_, res) => {
  res.json(events)
})

app.get('/api/event/:id', (req, res) => {
  const event = events.find((e) => e.id === req.params.id)
  if (event) {
    res.json(event)
  } else {
    res.status(404).send({ error: 'Event not found' })
  }
})

app.post('/api/events/create', upload.array('images'), (req, res) => {
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
  console.log(`Mock API running at http://localhost:${PORT}`)
})
