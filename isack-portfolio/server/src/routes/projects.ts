import { Router } from 'express'
import prisma from '../utils/prisma'
import { authGuard } from '../middleware/auth'

const router = Router()

function publicProject(p) {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    repoUrl: p.repoUrl,
    demoUrl: p.demoUrl,
    featured: p.featured,
    features: (p.features || []).map((f) => f.text),
    techs: (p.techs || []).map((t) => t.name),
  }
}

router.get('/', async (_req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
    include: { features: true, techs: true },
  })
  res.json(projects.map(publicProject))
})

router.get('/featured', async (_req, res) => {
  const projects = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { order: 'asc' },
    include: { features: true, techs: true },
  })
  res.json(projects.map(publicProject))
})

router.get('/:id', async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
    include: { features: true, techs: true },
  })
  if (!project) return res.status(404).json({ message: 'Project not found' })
  res.json(publicProject(project))
})

router.post('/', authGuard, async (req, res) => {
  const { title, description, image, repoUrl, demoUrl, featured, order, techs, features } = req.body
  const project = await prisma.project.create({
    data: {
      title,
      description,
      image,
      repoUrl,
      demoUrl,
      featured: !!featured,
      order: order || 0,
      techs: {
        create: (techs || []).map((name) => ({ name })),
      },
      features: {
        create: (features || []).map((text) => ({ text })),
      },
    },
    include: { features: true, techs: true },
  })
  res.status(201).json(publicProject(project))
})

router.put('/:id', authGuard, async (req, res) => {
  const { title, description, image, repoUrl, demoUrl, featured, order, techs, features } = req.body
  await prisma.projectTech.deleteMany({ where: { projectId: req.params.id } })
  await prisma.projectFeature.deleteMany({ where: { projectId: req.params.id } })
  const project = await prisma.project.update({
    where: { id: req.params.id },
    data: {
      title,
      description,
      image,
      repoUrl,
      demoUrl,
      featured: !!featured,
      order: order || 0,
      techs: { create: (techs || []).map((name) => ({ name })) },
      features: { create: (features || []).map((text) => ({ text })) },
    },
    include: { features: true, techs: true },
  })
  res.json(publicProject(project))
})

router.delete('/:id', authGuard, async (req, res) => {
  await prisma.project.delete({ where: { id: req.params.id } })
  res.json({ message: 'Deleted' })
})

export default router
