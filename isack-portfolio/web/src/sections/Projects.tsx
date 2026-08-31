import { useEffect, useState } from 'react'
import { api, type Project } from '../services/api'
import { SectionHeading, Reveal } from '../components/Reveal'
import { icons } from '../components/Icons'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    api.getProjects().then(setProjects).catch(() => {})
  }, [])

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Projects"
          title={<>My <span className="gradient-text">Projects</span></>}
          subtitle="A selection of the systems and applications I've designed and developed."
        />

        {projects.length === 0 ? (
          <p className="mx-auto max-w-xl text-center text-slate-500 dark:text-slate-400">
            Projects will appear here as I add them.
          </p>
        ) : (
          <div className="mx-auto max-w-3xl space-y-14">
            {projects.map((project) => (
              <Reveal key={project.id}>
                {project.featured && (
                  <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-primary-400">
                    Featured
                  </span>
                )}
                {project.image && (
                  <div className="mb-5 overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full max-h-80 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="font-display text-2xl font-bold">{project.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>

                {project.features.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {project.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-500 dark:text-slate-400">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap gap-6">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-slate-600 transition-colors hover:text-primary-400 dark:text-slate-300"
                    >
                      <span className="text-primary-400">{icons.github}</span> GitHub
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-semibold text-primary-400 transition-colors hover:text-accent-400"
                    >
                      <span className="text-primary-400">{icons.external}</span> Live Demo
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
