import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api, type Profile } from '../services/api'
import { icons } from '../components/Icons'
import { Reveal } from '../components/Reveal'

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => {})
  }, [])

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-60" />

      <div className="container-x relative grid items-center gap-12 py-20 md:grid-cols-2">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-400/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Open to opportunities
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-6xl">
              Hi, I&apos;m
              <br />
              <span className="gradient-text">Samuel,</span>
              <br />
              software developer.
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              3 years of experience building awesome web and mobile applications with great
              functionality through carefully crafted code and user-centric design.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">
                View Projects
                {icons.arrow}
              </a>
              <a href="#contact" className="btn-outline">
                Contact Me
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-10 flex items-center gap-4">
              <a
                href={profile?.github || '#'}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-slate-500 transition-all hover:border-primary-400/50 hover:text-primary-400 dark:text-slate-300"
              >
                {icons.github}
              </a>
              <a
                href={profile?.linkedin || '#'}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-slate-500 transition-all hover:border-primary-400/50 hover:text-primary-400 dark:text-slate-300"
              >
                {icons.linkedin}
              </a>
              <a
                href={`mailto:${profile?.email || ''}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-slate-500 transition-all hover:border-primary-400/50 hover:text-primary-400 dark:text-slate-300"
              >
                {icons.mail}
              </a>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto"
        >
          <div className="relative flex items-center justify-center">
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white/20 bg-surface-dark shadow-2xl sm:h-64 sm:w-64">
              <img src="/samuel.jpg" alt="Samuel Wambua" className="h-full w-full object-cover" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-primary-400">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
    </section>
  )
}
