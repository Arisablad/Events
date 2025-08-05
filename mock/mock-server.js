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
const eventsFilePath = path.join(process.cwd(), 'mock', 'events.json')

app.use(cors())
app.use(express.json())

const apiRouter = express.Router()
const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), 'public/uploads'),
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    },
  }),
})

const readEvents = async () => {
  try {
    const data = await fs.readFile(eventsFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (e) {
    return []
  }
}

const writeEvents = (data) =>
  fs.writeFile(eventsFilePath, JSON.stringify(data, null, 2))

apiRouter.get('/events', async (req, res) => {
  const events = await readEvents()
  res.json(events)
})

apiRouter.get('/events/:id', async (req, res) => {
  const events = await readEvents()
  const event = events.find((e) => e.id === req.params.id)
  if (event) {
    res.json(event)
  } else {
    res.status(404).json({ error: 'Event not found' })
  }
})

apiRouter.post('/events', upload.array('images'), async (req, res) => {
  const events = await readEvents()
  const newEvent = {
    id: uuidv4(),
    ...req.body,
    images: (req.files || []).map((file) => `/uploads/${file.filename}`),
  }
  events.push(newEvent)
  await writeEvents(events)
  res.status(201).json(newEvent)
})

app.use('/api', apiRouter)

app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')))
app.use(express.static(path.join(process.cwd(), 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📁 Serving frontend from: ${path.join(process.cwd(), 'dist')}`)
})
