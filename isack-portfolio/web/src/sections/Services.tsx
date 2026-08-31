import { useEffect, useState } from 'react'
import { api, type Service } from '../services/api'
import { SectionHeading, Reveal } from '../components/Reveal'
import { Icon } from '../components/Icons'

export default function Services() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    api.getServices().then(setServices).catch(() => {})
  }, [])

  return (
    <section id="services" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title={<>What I can <span className="gradient-text">offer</span></>}
          subtitle="Services I provide to help you build, scale and ship your product."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.07}>
              <div className="group card relative h-full overflow-hidden">
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary-500/10 blur-2xl transition-all group-hover:bg-primary-500/20" />
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-primary-400">
                  <Icon name={service.icon || 'code'} className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
