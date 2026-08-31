import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api, type Skill } from '../services/api'
import { SectionHeading, Reveal } from '../components/Reveal'
import { Icon } from '../components/Icons'

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    api.getSkills().then(setSkills).catch(() => {})
  }, [])

  return (
    <section id="skills" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-600/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Skills"
          title={<>Technologies I <span className="gradient-text">work with</span></>}
          subtitle="The tools and technologies I use to build and ship products end-to-end."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((skill, i) => (
            <Reveal key={skill.id} delay={i * 0.05}>
              <div className="card">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary-400/30 bg-primary-500/10 text-primary-400">
                      <Icon name={skill.icon || 'code'} className="h-5 w-5" />
                    </span>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <span className="font-mono text-sm text-accent-400">{skill.level}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
