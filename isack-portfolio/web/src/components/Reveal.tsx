import { motion } from 'framer-motion'
import React from 'react'

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
}) {
  return (
    <Reveal className="mb-14 text-center">
      <span className="inline-block rounded-full border border-primary-400/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-400">
        {eyebrow}
      </span>
      <h2 className="section-title mt-4">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400">{subtitle}</p>
      )}
    </Reveal>
  )
}
