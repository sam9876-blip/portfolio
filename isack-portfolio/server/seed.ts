import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const prisma = new PrismaClient()

async function main() {
  // Profile
  await prisma.profile.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      name: 'Samuel Wambua',
      title: 'Software Engineer & Full-Stack Developer',
      intro:
        'I build fast, scalable and beautiful web applications — from thoughtful UI to robust APIs and databases.',
      bio:
        "I'm a software engineer and full-stack developer who loves turning complex problems into clean, performant products. I specialise in the JavaScript/TypeScript ecosystem — React, Next.js, Node.js and PostgreSQL — and I enjoy owning a feature end-to-end: designing the database, building the API, and crafting the interface that users actually love.\n\nI'm currently focused on building real-world systems like TeaLink (a tea farm management platform) and YohPal, and I'm always looking for opportunities where I can ship value and grow with a great team.",
      email: 'hello@samuelwambua.dev',
      phone: '+254 700 000 000',
      github: 'https://github.com/samuelwambua',
      linkedin: 'https://linkedin.com/in/samuelwambua',
      location: 'Nairobi, Kenya',
      resumeUrl: '/resume.pdf',
    },
  })

  // Admin user
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)
  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@samuelwambua.dev' },
    update: { password },
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@samuelwambua.dev',
      name: 'Samuel Wambua',
      password,
    },
  })

  // Projects
  const teaLink = await prisma.project.create({
    data: {
      title: 'TeaLink',
      description:
        'A complete farm management system for tea cooperatives — tracking farmers, plot yields, harvest records, and payout calculations in a single dashboard.',
      repoUrl: 'https://github.com/samuelwambua/tealink',
      demoUrl: 'https://tealink.demo.com',
      featured: true,
      order: 1,
      features: {
        create: [
          { text: 'Farmer and plot registration & management' },
          { text: 'Harvest and yield tracking with monthly aggregation' },
          { text: 'Automated green-leaf payout calculation' },
          { text: 'Role-based dashboards for admin, field officers and farmers' },
        ],
      },
      techs: {
        create: [
          { name: 'React' },
          { name: 'TypeScript' },
          { name: 'Node.js' },
          { name: 'Express' },
          { name: 'PostgreSQL' },
          { name: 'Prisma' },
        ],
      },
    },
  })

  await prisma.project.create({
    data: {
      title: 'YohPal',
      description:
        'A digital companion app that helps users organise personal goals, routines and payments in one friendly, minimal interface.',
      repoUrl: 'https://github.com/samuelwambua/yohpal',
      demoUrl: 'https://yohpal.demo.com',
      featured: true,
      order: 2,
      techs: {
        create: [
          { name: 'Flutter' },
          { name: 'Dart' },
          { name: 'Firebase' },
          { name: 'REST API' },
        ],
      },
    },
  })

  await prisma.project.create({
    data: {
      title: 'ICS Live',
      description:
        'A real-time information and communication system for institutions, delivering live announcements, notices and schedules to students and staff.',
      repoUrl: 'https://github.com/samuelwambua/ics-live',
      demoUrl: 'https://icslive.demo.com',
      featured: true,
      order: 3,
      techs: {
        create: [
          { name: 'Next.js' },
          { name: 'TypeScript' },
          { name: 'Node.js' },
          { name: 'PostgreSQL' },
          { name: 'WebSockets' },
        ],
      },
    },
  })

  await prisma.project.create({
    data: {
      title: 'School Management System',
      description:
        'A full school administration platform covering students, staff, classes, attendance, results and fee management with a clean reporting module.',
      repoUrl: 'https://github.com/samuelwambua/sms',
      demoUrl: 'https://sms.demo.com',
      featured: false,
      order: 4,
      features: {
        create: [
          { text: 'Student & staff records management' },
          { text: 'Attendance and timetable scheduling' },
          { text: 'Exam results entry and report cards' },
          { text: 'Fee billing and payment tracking' },
        ],
      },
      techs: {
        create: [
          { name: 'Django' },
          { name: 'Python' },
          { name: 'PostgreSQL' },
          { name: 'Bootstrap' },
        ],
      },
    },
  })

  // Skills
  const skills = [
    { name: 'JavaScript / TypeScript', level: 90, icon: 'code' },
    { name: 'React / Next.js', level: 88, icon: 'react' },
    { name: 'Node.js / Express', level: 85, icon: 'node' },
    { name: 'Python / Django', level: 78, icon: 'python' },
    { name: 'PostgreSQL / Prisma', level: 84, icon: 'database' },
    { name: 'Git / GitHub', level: 90, icon: 'git' },
    { name: 'Docker / Linux', level: 75, icon: 'docker' },
    { name: 'Flutter', level: 72, icon: 'flutter' },
  ]
  for (let i = 0; i < skills.length; i++) {
    const s = skills[i]
    await prisma.skill.upsert({
      where: { id: `skill-${i}` },
      update: { name: s.name, level: s.level, icon: s.icon, order: i },
      create: { id: `skill-${i}`, name: s.name, level: s.level, icon: s.icon, order: i },
    })
  }

  // Experience
  await prisma.experience.create({
    data: {
      role: 'Backend Developer — Intern',
      company: 'TeaLink Systems',
      location: 'Nairobi, Kenya',
      startDate: 'Jan 2024',
      endDate: 'Jun 2024',
      current: false,
      order: 1,
      description:
        'Built REST APIs for farm management, designed PostgreSQL schemas with Prisma, and shipped features that reduced payout processing time by 40%.',
    },
  })
  await prisma.experience.create({
    data: {
      role: 'Web Developer',
      company: 'ICT Solutions',
      location: 'Remote',
      startDate: 'Jul 2024',
      endDate: undefined,
      current: true,
      order: 2,
      description:
        'Developing and maintaining client web applications end-to-end — from UI in React to deployment on Linux servers with Docker.',
    },
  })

  // Education
  await prisma.education.create({
    data: {
      institution: 'University of Nairobi',
      degree: 'BSc. Computer Science',
      period: '2020 – 2024',
      description: 'Relevant coursework: Data Structures, Databases, Web Technologies, Software Engineering.',
      order: 1,
    },
  })
  await prisma.education.create({
    data: {
      institution: 'Certifications',
      degree: 'Full-Stack Web Development',
      period: '2023',
      description: 'Advanced certification in modern web development (MERN & Next.js).',
      order: 2,
    },
  })

  // Services
  const services = [
    { title: 'Web Development', description: 'Modern, responsive, animated websites and web apps built with React & Next.js.', icon: 'globe' },
    { title: 'Backend / API Development', description: 'Secure, scalable REST APIs with Node.js/Express and Django.', icon: 'server' },
    { title: 'Database Design', description: 'Relational database modelling and optimisation with PostgreSQL & Prisma.', icon: 'database' },
    { title: 'System Development', description: 'End-to-end systems from requirements to deployment.', icon: 'cpu' },
    { title: 'Deployment & Hosting', description: 'CI/CD pipelines, Docker containers and Linux server administration.', icon: 'cloud' },
  ]
  for (let i = 0; i < services.length; i++) {
    const s = services[i]
    await prisma.service.upsert({
      where: { id: `service-${i}` },
      update: { icon: s.icon, description: s.description, order: i },
      create: { id: `service-${i}`, title: s.title, description: s.description, icon: s.icon, order: i },
    })
  }

  console.log('🌱 Seed data created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
