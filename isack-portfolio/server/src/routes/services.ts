import { Router } from 'express'
import prisma from '../utils/prisma'
import { authGuard } from '../middleware/auth'

const router = Router()

router.get('/', async (_req, res) => {
  const items = await prisma.service.findMany({ orderBy: { order: 'asc' } })
  res.json(items)
})

router.post('/', authGuard, async (req, res) => {
  const { title, description, icon, order } = req.body
  const item = await prisma.service.create({ data: { title, description, icon, order } })
  res.status(201).json(item)
})

router.put('/:id', authGuard, async (req, res) => {
  const { title, description, icon, order } = req.body
  const item = await prisma.service.update({
    where: { id: req.params.id },
    data: { title, description, icon, order },
  })
  res.json(item)
})

router.delete('/:id', authGuard, async (req, res) => {
  await prisma.service.delete({ where: { id: req.params.id } })
  res.json({ message: 'Deleted' })
})

export default router
