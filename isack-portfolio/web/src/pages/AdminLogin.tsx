import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api'
import { useTheme } from '../context/ThemeContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { token } = await api.login(email, password)
      localStorage.setItem('portfolio_token', token)
      navigate('/admin')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-primary-400/60'

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-60" />
      <div className="pointer-events-none absolute -top-20 left-1/3 h-[400px] w-[400px] rounded-full bg-primary-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-[300px] w-[300px] rounded-full bg-accent-500/20 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-bold">
            <span className="gradient-text">Samuel</span>
            <span className="text-slate-400">.</span>
          </Link>
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="card p-8">
          <h1 className="font-display text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to manage your portfolio.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@samuelwambua.dev" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Password</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" className={inputClass} />
            </div>

            {error && <p className="rounded-lg bg-red-500/15 px-4 py-3 text-sm text-red-400">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-slate-500">
            Demo credentials: <span className="font-mono text-primary-300">admin@samuelwambua.dev</span> /{' '}
            <span className="font-mono text-primary-300">admin123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
