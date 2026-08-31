import { Router } from 'express'
import { authGuard } from '../middleware/auth'
import { upload } from '../middleware/upload'

const router = Router()

router.post('/', authGuard, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  const url = `/uploads/${req.file.filename}`
  res.json({ url })
})

export default router
