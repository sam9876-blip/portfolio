import { Router } from 'express'
import prisma from '../utils/prisma'
import { authGuard } from '../middleware/auth'

const router = Router()

router.get('/', async (_req, res) => {
  const items = await prisma.education.findMany({ orderBy: { order: 'asc' } })
  res.json(items)
})

router.post('/', authGuard, async (req, res) => {
  const { institution, degree, period, description, order } = req.body
  const item = await prisma.education.create({ data: { institution, degree, period, description, order } })
  res.status(201).json(item)
})

router.put('/:id', authGuard, async (req, res) => {
  const { institution, degree, period, description, order } = req.body
  const item = await prisma.education.update({
    where: { id: req.params.id },
    data: { institution, degree, period, description, order },
  })
  res.json(item)
})

router.delete('/:id', authGuard, async (req, res) => {
  await prisma.education.delete({ where: { id: req.params.id } })
  res.json({ message: 'Deleted' })
})

export default router
