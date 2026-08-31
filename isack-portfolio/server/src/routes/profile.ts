import { Router } from 'express'
import prisma from '../utils/prisma'
import { authGuard } from '../middleware/auth'

const router = Router()

router.get('/', async (_req, res) => {
  const profile = await prisma.profile.findUnique({ where: { id: 'main' } })
  if (!profile) return res.status(404).json({ message: 'Profile not found' })
  res.json(profile)
})

router.put('/', authGuard, async (_req, res) => {
  const data = _req.body
  const profile = await prisma.profile.update({ where: { id: 'main' }, data })
  res.json(profile)
})

export default router
