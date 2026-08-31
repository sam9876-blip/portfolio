import { Router } from 'express'
import prisma from '../utils/prisma'
import { authGuard } from '../middleware/auth'

const router = Router()

router.get('/', async (_req, res) => {
  const items = await prisma.experience.findMany({ orderBy: { order: 'asc' } })
  res.json(items)
})

router.post('/', authGuard, async (_req, res) => {
  const data = _req.body
  const item = await prisma.experience.create({ data })
  res.status(201).json(item)
})

router.put('/:id', authGuard, async (req, res) => {
  const { role, company, location, startDate, endDate, current, description, order } = req.body
  const item = await prisma.experience.update({
    where: { id: req.params.id },
    data: { role, company, location, startDate, endDate, current: !!current, description, order },
  })
  res.json(item)
})

router.delete('/:id', authGuard, async (req, res) => {
  await prisma.experience.delete({ where: { id: req.params.id } })
  res.json({ message: 'Deleted' })
})

export default router
