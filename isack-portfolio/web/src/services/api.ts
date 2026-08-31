export interface Project {
  id: string
  title: string
  description: string
  image?: string | null
  repoUrl?: string | null
  demoUrl?: string | null
  featured: boolean
  features: string[]
  techs: string[]
}

export interface Skill {
  id: string
  name: string
  level: number
  icon?: string | null
  order: number
}

export interface Experience {
  id: string
  role: string
  company: string
  location?: string | null
  startDate: string
  endDate?: string | null
  current: boolean
  description: string
  order: number
}

export interface Education {
  id: string
  institution: string
  degree: string
  period: string
  description?: string | null
  order: number
}

export interface Service {
  id: string
  title: string
  description: string
  icon?: string | null
  order: number
}

export interface Message {
  id: string
  name: string
  email: string
  phone?: string | null
  subject?: string | null
  body: string
  read: boolean
  createdAt: string
}

export interface Profile {
  id: string
  name: string
  title: string
  intro: string
  bio: string
  image?: string | null
  email: string
  phone: string
  github?: string | null
  linkedin?: string | null
  location?: string | null
  resumeUrl?: string | null
}

const BASE = import.meta.env.VITE_API_URL || ''

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('portfolio_token')
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  }
  const res = await fetch(`${BASE}${path}`, { ...options, headers })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || 'Request failed')
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export const api = {
  // Public
  getProjects: () => request<Project[]>('/api/projects'),
  getFeaturedProjects: () => request<Project[]>('/api/projects/featured'),
  getSkills: () => request<Skill[]>('/api/skills'),
  getExperience: () => request<Experience[]>('/api/experience'),
  getEducation: () => request<Education[]>('/api/education'),
  getServices: () => request<Service[]>('/api/services'),
  getProfile: () => request<Profile>('/api/profile'),
  sendMessage: (data: { name: string; email: string; phone?: string; subject?: string; body: string }) =>
    request('/api/messages', { method: 'POST', body: JSON.stringify(data) }),

  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; user: { id: string; email: string; name: string } }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<{ id: string; email: string; name: string }>('/api/auth/me'),

  // Admin
  createProject: (data: Partial<Project>) => request<Project>('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id: string, data: Partial<Project>) => request<Project>(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id: string) => request(`/api/projects/${id}`, { method: 'DELETE' }),

  createSkill: (data: Partial<Skill>) => request<Skill>('/api/skills', { method: 'POST', body: JSON.stringify(data) }),
  updateSkill: (id: string, data: Partial<Skill>) => request<Skill>(`/api/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSkill: (id: string) => request(`/api/skills/${id}`, { method: 'DELETE' }),

  createExperience: (data: Partial<Experience>) => request<Experience>('/api/experience', { method: 'POST', body: JSON.stringify(data) }),
  updateExperience: (id: string, data: Partial<Experience>) => request<Experience>(`/api/experience/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteExperience: (id: string) => request<{ message: string }>(`/api/experience/${id}`, { method: 'DELETE' }),

  getMessages: () => request<Message[]>('/api/messages'),
  markMessageRead: (id: string, read: boolean) => request<Message>(`/api/messages/${id}/read`, { method: 'PATCH', body: JSON.stringify({ read }) }),
  deleteMessage: (id: string) => request(`/api/messages/${id}`, { method: 'DELETE' }),

  updateProfile: (data: Partial<Profile>) => request<Profile>('/api/profile', { method: 'PUT', body: JSON.stringify(data) }),

  uploadImage: async (file: File) => {
    const token = localStorage.getItem('portfolio_token')
    const form = new FormData()
    form.append('image', file)
    const res = await fetch(`${BASE}/api/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    })
    if (!res.ok) throw new Error('Upload failed')
    return res.json()
  },
}
