import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const links = [
  { href: 'home', label: 'Home' },
  { href: 'about', label: 'About' },
  { href: 'skills', label: 'Skills' },
  { href: 'projects', label: 'Projects' },
  { href: 'experience', label: 'Experience' },
  { href: 'services', label: 'Services' },
  { href: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = links.map((l) => document.getElementById(l.href))
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i]
        if (s && s.getBoundingClientRect().top <= 120) {
          setActive(links[i].href)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setOpen(false)
    if (location.pathname !== '/') {
      window.location.href = `/#${href}`
      return
    }
    document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-white/70 backdrop-blur-xl dark:bg-surface-dark/70'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#home" onClick={(e) => scrollTo(e, 'home')} className="font-display text-lg font-bold">
          <span className="gradient-text">Samuel</span>
          <span className="text-slate-400">.</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={`#${l.href}`}
              onClick={(e) => scrollTo(e, l.href)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active === l.href
                  ? 'text-primary-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-500 transition-colors hover:text-primary-400 dark:text-slate-300"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 border-l border-white/10 bg-white p-6 dark:bg-surface-dark">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display font-bold">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={`#${l.href}`}
                  onClick={(e) => scrollTo(e, l.href)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-white/5 hover:text-white dark:text-slate-300"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
