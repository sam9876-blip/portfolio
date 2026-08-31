import { useEffect, useState } from 'react'
import { api, type Education, type Experience } from '../services/api'
import { SectionHeading, Reveal } from '../components/Reveal'
import { icons } from '../components/Icons'

export default function Experience() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])

  useEffect(() => {
    api.getExperience().then(setExperience).catch(() => {})
    api.getEducation().then(setEducation).catch(() => {})
  }, [])

  return (
    <section id="experience" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-accent-500/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Journey"
          title={<>Experience & <span className="gradient-text">Education</span></>}
          subtitle="My professional journey and academic background."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Experience timeline */}
          <Reveal>
            <h3 className="mb-6 flex items-center gap-2 font-display text-xl font-bold">
              <span className="text-primary-400">{icons.server}</span> Work Experience
            </h3>
            <div className="relative space-y-6 border-l border-white/10 pl-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-primary-400 bg-surface-dark" />
                  <div className="card">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-semibold">{exp.role}</h4>
                      {exp.current && (
                        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-primary-400">{exp.company}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      {exp.location && <>{icons.location} {exp.location} · </>}
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Education */}
          <Reveal delay={0.15}>
            <h3 className="mb-6 flex items-center gap-2 font-display text-xl font-bold">
              <span className="text-primary-400">{icons.code}</span> Education & Certifications
            </h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="card">
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="mt-1 text-sm font-medium text-primary-400">{edu.institution}</p>
                  <p className="mt-1 text-xs text-slate-500">{edu.period}</p>
                  {edu.description && (
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
