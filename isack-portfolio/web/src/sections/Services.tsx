import { SectionHeading, Reveal } from '../components/Reveal'

const offerings = [
  {
    title: 'Websites & Webapps',
    description:
      'I develop back-end & front-end applications with React, Vue, Angular, Django, Node & GO.',
  },
  {
    title: 'Mobile Applications',
    description:
      'I do iOS and android app development with Flutter and React Native.',
  },
]

const tools = [
  { label: 'Frontend', items: 'React, Angular, Vue' },
  { label: 'Backend', items: 'Django, Flask, Node Express, Go' },
  { label: 'Mobile', items: 'React Native, Flutter, Expo' },
]

const stats = [
  { value: '3+', label: 'Years of Experience' },
  { value: '15+', label: 'Projects Finished' },
]

export default function Services() {
  return (
    <section id="services" className="section relative overflow-hidden">
      <div className="container-x relative">
        <SectionHeading
          eyebrow="What I do"
          title={<>What I <span className="gradient-text">do</span></>}
        />

        <div className="mx-auto max-w-4xl space-y-12">
          <div className="space-y-10">
            {offerings.map((o, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="font-display text-2xl font-bold">{o.title}</p>
                <p className="mt-2 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  {o.description}
                </p>
              </Reveal>
            ))}
          </div>

          <div>
            <Reveal>
              <p className="font-display text-2xl font-bold">Tools & technologies</p>
            </Reveal>
            <div className="mt-6 grid gap-8 sm:grid-cols-3">
              {tools.map((t, i) => (
                <Reveal key={t.label} delay={i * 0.05}>
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">
                    {t.label}
                  </p>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{t.items}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid gap-8 pt-4 sm:grid-cols-2">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05} className="text-center">
                <p className="font-display text-6xl font-extrabold gradient-text">{s.value}</p>
                <p className="mt-2 text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
