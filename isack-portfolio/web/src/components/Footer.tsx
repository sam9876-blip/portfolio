import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { theme } = useTheme()
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Samuel Wambua. Built with React, TypeScript & Tailwind.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a href="#home" className="text-slate-500 transition-colors hover:text-primary-400">
            Back to top ↑
          </a>
          <Link to="/admin" className="text-slate-500 transition-colors hover:text-primary-400">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
