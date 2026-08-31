import React from 'react'
import { motion } from 'framer-motion'

export const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-slate-500 focus:border-primary-400/60'

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95'

export const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/5'

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  )
}

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
  if (!open) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative my-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-white p-6 dark:bg-surface-card"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 hover:bg-white/5">
            ✕
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}

export function Empty({ text }: { text: string }) {
  return <p className="py-10 text-center text-sm text-slate-500">{text}</p>
}
