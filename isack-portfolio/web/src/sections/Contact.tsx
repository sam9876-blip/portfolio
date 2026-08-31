import { useEffect, useState } from 'react'
import { api, type Profile } from '../services/api'
import { SectionHeading, Reveal } from '../components/Reveal'
import { icons } from '../components/Icons'

export default function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', body: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => {})
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await api.sendMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', body: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const infoCards: { icon: React.ReactNode; label: string; value?: string; href?: string }[] = [
    { icon: icons.mail, label: 'Email', value: profile?.email ?? undefined, href: `mailto:${profile?.email}` },
    { icon: icons.phone, label: 'Phone', value: profile?.phone ?? undefined, href: `tel:${profile?.phone}` },
    { icon: icons.location, label: 'Location', value: profile?.location ?? undefined, href: undefined },
    { icon: icons.github, label: 'GitHub', value: profile?.github?.replace('https://', ''), href: profile?.github ?? undefined },
  ]

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-500 focus:border-primary-400/60'

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-600/15 blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Contact"
          title={<>Let&apos;s build something <span className="gradient-text">together</span></>}
          subtitle="Have a project in mind or want to work together? Get in touch."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="grid gap-4">
              {infoCards.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target={c.href?.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="card flex items-center gap-4"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-primary-400">
                    {c.icon}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">{c.label}</p>
                    <p className="font-medium break-all">{c.value || '—'}</p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Your name *</label>
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Your email *</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+254 ..." className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="Project inquiry" className={inputClass} />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium">Message *</label>
                <textarea required name="body" value={form.body} onChange={handleChange} rows={6} placeholder="Tell me about your project..." className={inputClass} />
              </div>

              <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full disabled:opacity-60">
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="mt-4 rounded-lg bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-400">
                  ✓ Message sent! I'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-4 rounded-lg bg-red-500/15 px-4 py-3 text-sm font-medium text-red-400">
                  ✕ Failed to send. Please try again.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
