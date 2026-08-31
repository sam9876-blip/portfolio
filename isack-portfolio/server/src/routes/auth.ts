import { Router } from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../utils/prisma'
import { signToken, authGuard, type AuthRequest } from '../middleware/auth'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.adminUser.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
  const token = signToken(user.id)
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
})

router.get('/me', authGuard, async (req: AuthRequest, res) => {
  const user = await prisma.adminUser.findUnique({ where: { id: req.userId as string } })
  if (!user) return res.status(404).json({ message: 'Not found' })
  res.json({ id: user.id, email: user.email, name: user.name })
})

export default router
