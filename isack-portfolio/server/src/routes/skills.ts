import { Router } from 'express'
import prisma from '../utils/prisma'
import { authGuard } from '../middleware/auth'

const router = Router()

router.get('/', async (_req, res) => {
  const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' } })
  res.json(skills)
})

router.post('/', authGuard, async (_req, res) => {
  const { name, level, icon, order } = _req.body
  const skill = await prisma.skill.create({ data: { name, level, icon, order } })
  res.status(201).json(skill)
})

router.put('/:id', authGuard, async (req, res) => {
  const { name, level, icon, order } = req.body
  const skill = await prisma.skill.update({
    where: { id: req.params.id },
    data: { name, level, icon, order },
  })
  res.json(skill)
})

router.delete('/:id', authGuard, async (req, res) => {
  await prisma.skill.delete({ where: { id: req.params.id } })
  res.json({ message: 'Deleted' })
})

export default router
