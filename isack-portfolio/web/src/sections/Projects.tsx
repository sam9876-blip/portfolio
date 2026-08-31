import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, type Project } from '../services/api'
import { SectionHeading, Reveal } from '../components/Reveal'
import { icons } from '../components/Icons'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState<string>('All')

  useEffect(() => {
    api.getProjects().then(setProjects).catch(() => {})
  }, [])

  const techSet = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => p.techs.forEach((t) => set.add(t)))
    return ['All', ...Array.from(set)]
  }, [projects])

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.techs.includes(filter))),
    [filter, projects]
  )

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Projects"
          title={<>Things I&apos;ve <span className="gradient-text">built</span></>}
          subtitle="A selection of the systems and applications I've designed and developed."
        />

        {techSet.length > 1 && (
          <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
            {techSet.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  filter === t
                    ? 'border-primary-400 bg-primary-500/20 text-primary-300'
                    : 'border-white/10 text-slate-500 hover:border-primary-400/40 hover:text-primary-300 dark:text-slate-300'
                }`}
              >
                {t}
              </button>
            ))}
          </Reveal>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group card flex flex-col overflow-hidden !p-0"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-display text-5xl font-extrabold gradient-text">{project.title.charAt(0)}</span>
                    </div>
                  )}
                  {project.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 px-3 py-1 text-xs font-bold text-white">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>

                  {project.features.length > 0 && (
                    <div className="mt-4 grid gap-1.5">
                      {project.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <span className="mt-0.5 text-accent-400">✓</span> {f}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techs.map((t) => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium transition-all hover:border-primary-400/50 hover:text-primary-300"
                      >
                        {icons.github} Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-accent-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      >
                        {icons.external} Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="py-10 text-center text-slate-500">No projects match this filter.</p>
        )}
      </div>
    </section>
  )
}
