import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api, type Profile } from '../services/api'
import { icons } from '../components/Icons'
import { Reveal } from '../components/Reveal'

const roles = ['Full-Stack Developer', 'Software Engineer', 'UI/UX Enthusiast', 'Backend Builder']

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => {})
  }, [])

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-primary-600/25 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[480px] w-[480px] rounded-full bg-accent-500/20 blur-[130px]" />

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
              Hi, I&apos;m <span className="gradient-text">{profile?.name || 'Samuel Wambua'}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-4 flex h-9 items-center font-mono text-lg text-accent-400 sm:text-xl">
              <span className="text-primary-400">&gt;</span>&nbsp;
              <span key={roleIndex} className="animate-pulse">
                {roles[roleIndex]}
              </span>
              <span className="ml-1 animate-pulse text-primary-400">|</span>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {profile?.intro ||
                'I build fast, scalable and beautiful web applications — from thoughtful UI to robust APIs and databases.'}
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
          <div className="relative">
            <div className="absolute inset-0 animate-spin-slow rounded-3xl bg-[conic-gradient(from_0deg,#6366f1,#22d3ee,#a855f7,#6366f1)] opacity-80 blur-2xl" />
            <div className="relative h-72 w-72 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-2 sm:h-80 sm:w-80">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-surface-dark/80">
                {profile?.image ? (
                  <img src={profile.image} alt={profile.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-display text-8xl font-extrabold gradient-text">
                    {profile?.name?.charAt(0) || 'S'}
                  </span>
                )}
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 animate-float rounded-2xl border border-white/10 bg-white/70 p-4 backdrop-blur-xl dark:bg-surface-card/70">
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">Years of building</p>
              <p className="font-display text-2xl font-bold gradient-text">3+</p>
            </div>
            <div className="absolute -right-4 top-6 animate-float rounded-2xl border border-white/10 bg-white/70 p-3 backdrop-blur-xl dark:bg-surface-card/70" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="text-sm font-semibold">Technologies</span>
              </div>
              <div className="mt-2 flex gap-1 text-accent-400">{icons.react}{icons.node}{icons.database}</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-slate-400">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
    </section>
  )
}
