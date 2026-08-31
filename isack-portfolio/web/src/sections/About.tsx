import { useEffect, useState } from 'react'
import { api, type Profile } from '../services/api'
import { SectionHeading, Reveal } from '../components/Reveal'
import { icons } from '../components/Icons'

export default function About() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => {})
  }, [])

  const bioParagraphs = (profile?.bio || '')
    .split('\n')
    .filter(Boolean)

  const highlights = [
    { icon: icons.code, label: 'Clean, maintainable code' },
    { icon: icons.database, label: 'Database-driven applications' },
    { icon: icons.cloud, label: 'Full-stack ownership' },
  ]

  return (
    <section id="about" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="About Me"
          title={<>A developer who ships <span className="gradient-text">products</span></>}
          subtitle="Get to know my background, what I specialise in, and where I'm headed."
        />

        <div className="grid items-start gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="card">
              <h3 className="mb-4 font-display text-xl font-bold">Background</h3>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                {bioParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="text-accent-400">{h.icon}</span>
                    <span className="text-sm font-medium">{h.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="space-y-4">
              <div className="card">
                <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
                  <span className="text-primary-400">{icons.globe}</span> Quick Facts
                </h3>
                <ul className="space-y-3 text-sm">
                  {profile?.location && (
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400">{icons.location}</span> {profile.location}
                    </li>
                  )}
                  {profile?.phone && (
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400">{icons.phone}</span> {profile.phone}
                    </li>
                  )}
                  {profile?.email && (
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400">{icons.mail}</span> {profile.email}
                    </li>
                  )}
                  <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400">{icons.code}</span> Full-Stack
                  </li>
                </ul>
              </div>

              <div className="card bg-gradient-to-br from-primary-500/10 to-accent-500/10">
                <h3 className="mb-3 font-display text-lg font-bold">Career Goals</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  I&apos;m focused on building real-world systems that create value, growing into
                  senior engineering leadership, and contributing to products used by thousands of people.
                </p>
              </div>

              <div className="card">
                <h3 className="mb-3 font-display text-lg font-bold">What I Specialise In</h3>
                <div className="flex flex-wrap gap-2">
                  {['Web Apps', 'APIs', 'Databases', 'UI/UX', 'Deployment'].map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
