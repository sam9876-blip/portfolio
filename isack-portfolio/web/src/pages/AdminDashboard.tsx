import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api, type Project, type Skill, type Experience, type Message } from '../services/api'
import { useTheme } from '../context/ThemeContext'
import ProjectManager from './admin/ProjectManager'
import MessagesManager from './admin/MessagesManager'
import SkillsManager from './admin/SkillsManager'
import ExperienceManager from './admin/ExperienceManager'
import ProfileManager from './admin/ProfileManager'

type Tab = 'overview' | 'projects' | 'messages' | 'skills' | 'experience' | 'profile'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'projects', label: 'Projects', icon: '🗂️' },
  { id: 'messages', label: 'Messages', icon: '✉️' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'profile', label: 'Profile', icon: '👤' },
]

export default function AdminDashboard() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [tab, setTab] = useState<Tab>('overview')
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    api.me()
      .then(() => setAuthed(true))
      .catch(() => {
        localStorage.removeItem('portfolio_token')
        setAuthed(false)
      })
  }, [])

  useEffect(() => {
    if (!authed) return
    Promise.all([api.getProjects(), api.getSkills(), api.getExperience(), api.getMessages()])
      .then(([p, s, e, m]) => {
        setProjects(p)
        setSkills(s)
        setExperience(e)
        setMessages(m)
      })
      .catch(() => {})
  }, [authed])

  const logout = () => {
    localStorage.removeItem('portfolio_token')
    navigate('/admin/login')
  }

  if (authed === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
        <p className="text-xl">You need to be logged in.</p>
        <Link to="/admin/login" className="btn-primary">Go to Login</Link>
      </div>
    )
  }

  if (authed === null) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  const unread = messages.filter((m) => !m.read).length

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-lg font-bold">
              <span className="gradient-text">Admin</span> Dashboard
            </h1>
            <Link to="/" className="hidden text-sm text-slate-500 hover:text-primary-400 sm:block">← View site</Link>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggle} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button onClick={logout} className="btn-outline !px-4 !py-2 text-sm">Logout</button>
          </div>
        </div>
      </header>

      <div className="container-x grid gap-6 py-8 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'bg-primary-500/15 text-primary-300'
                  : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
              {t.id === 'messages' && unread > 0 && (
                <span className="ml-auto rounded-full bg-red-500/20 px-2 text-xs font-bold text-red-400">{unread}</span>
              )}
            </button>
          ))}
        </nav>

        <div>
          {tab === 'overview' && (
            <div>
              <h2 className="mb-6 font-display text-2xl font-bold">Overview</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Projects" value={projects.length} />
                <StatCard label="Skills" value={skills.length} />
                <StatCard label="Experience entries" value={experience.length} />
                <StatCard label="Unread messages" value={unread} />
              </div>
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <RecentMessages messages={messages.slice(0, 5)} onOpen={() => setTab('messages')} />
              </div>
            </div>
          )}
          {tab === 'projects' && <ProjectManager projects={projects} setProjects={setProjects} />}
          {tab === 'messages' && <MessagesManager messages={messages} setMessages={setMessages} />}
          {tab === 'skills' && <SkillsManager skills={skills} setSkills={setSkills} />}
          {tab === 'experience' && <ExperienceManager experience={experience} setExperience={setExperience} />}
          {tab === 'profile' && <ProfileManager />}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold gradient-text">{value}</p>
    </div>
  )
}

function RecentMessages({ messages, onOpen }: { messages: Message[]; onOpen: () => void }) {
  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Recent messages</h3>
        <button onClick={onOpen} className="text-sm text-primary-400 hover:underline">View all</button>
      </div>
      {messages.length === 0 ? (
        <p className="text-sm text-slate-500">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="flex items-start justify-between gap-3 border-b border-white/5 pb-3 last:border-0">
              <div>
                <p className="text-sm font-medium">{m.name} {!m.read && <span className="text-primary-400">•</span>}</p>
                <p className="line-clamp-1 text-xs text-slate-500">{m.subject || m.body}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-500">{new Date(m.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
