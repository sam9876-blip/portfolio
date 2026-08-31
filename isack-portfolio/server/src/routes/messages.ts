import { Router } from 'express'
import prisma from '../utils/prisma'
import { authGuard } from '../middleware/auth'

const router = Router()

router.get('/', authGuard, async (_req, res) => {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(messages)
})

router.post('/', async (req, res) => {
  const { name, email, phone, subject, body } = req.body
  if (!name || !email || !body) {
    return res.status(400).json({ message: 'Name, email and message are required' })
  }
  const message = await prisma.message.create({
    data: { name, email, phone, subject, body },
  })
  res.status(201).json({ id: message.id })
})

router.patch('/:id/read', authGuard, async (req, res) => {
  const { read } = req.body
  const message = await prisma.message.update({
    where: { id: req.params.id },
    data: { read: !!read },
  })
  res.json(message)
})

router.delete('/:id', authGuard, async (req, res) => {
  await prisma.message.delete({ where: { id: req.params.id } })
  res.json({ message: 'Deleted' })
})

export default router
