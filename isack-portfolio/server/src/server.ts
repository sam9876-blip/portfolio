import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import path from 'path'

import projectRoutes from './routes/projects'
import skillRoutes from './routes/skills'
import experienceRoutes from './routes/experience'
import educationRoutes from './routes/education'
import serviceRoutes from './routes/services'
import messageRoutes from './routes/messages'
import profileRoutes from './routes/profile'
import authRoutes from './routes/auth'
import uploadRoutes from './routes/upload'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
)
app.use(express.json({ limit: '1mb' }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api', limiter)

app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/experience', experienceRoutes)
app.use('/api/education', educationRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

const webDist = path.join(__dirname, '..', '..', 'web', 'dist')
app.use(express.static(webDist))

app.get('*', (_req, res) => {
  res.sendFile(path.join(webDist, 'index.html'))
})

app.use((err: Error, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Something went wrong', error: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Portfolio API running on http://localhost:${PORT}`)
})
