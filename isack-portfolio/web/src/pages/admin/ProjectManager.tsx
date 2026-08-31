import { useState } from 'react'
import { api, type Project } from '../../services/api'
import { Modal, Field, inputClass, btnPrimary, btnGhost, Empty } from './ui'

interface FormState {
  id?: string
  title: string
  description: string
  image: string
  repoUrl: string
  demoUrl: string
  featured: boolean
  order: number
  techs: string
  features: string
}

const emptyForm: FormState = {
  title: '',
  description: '',
  image: '',
  repoUrl: '',
  demoUrl: '',
  featured: false,
  order: 0,
  techs: '',
  features: '',
}

export default function ProjectManager({
  projects,
  setProjects,
}: {
  projects: Project[]
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>
}) {
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [uploading, setUploading] = useState(false)

  const openCreate = () => {
    setForm(emptyForm)
    setModal(true)
  }

  const openEdit = (p: Project) => {
    setForm({
      id: p.id,
      title: p.title,
      description: p.description,
      image: p.image || '',
      repoUrl: p.repoUrl || '',
      demoUrl: p.demoUrl || '',
      featured: p.featured,
      order: 0,
      techs: p.techs.join(', '),
      features: p.features.join('\n'),
    })
    setModal(true)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const { url } = await api.uploadImage(file)
      setForm({ ...form, image: url })
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      title: form.title,
      description: form.description,
      image: form.image || undefined,
      repoUrl: form.repoUrl || undefined,
      demoUrl: form.demoUrl || undefined,
      featured: form.featured,
      order: Number(form.order || 0),
      techs: form.techs.split(',').map((t) => t.trim()).filter(Boolean),
      features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
    }
    try {
      if (form.id) {
        const updated = await api.updateProject(form.id, payload)
        setProjects((prev) => prev.map((p) => (p.id === form.id ? updated : p)))
      } else {
        const created = await api.createProject(payload)
        setProjects((prev) => [...prev, created])
      }
      setModal(false)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDelete = async (p: Project) => {
    if (!confirm(`Delete "${p.title}"?`)) return
    try {
      await api.deleteProject(p.id)
      setProjects((prev) => prev.filter((x) => x.id !== p.id))
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Projects</h2>
        <button onClick={openCreate} className={btnPrimary}>+ Add Project</button>
      </div>

      {projects.length === 0 ? (
        <Empty text="No projects yet. Add your first one!" />
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-bold text-primary-400">{p.title.charAt(0)}</div>
                  )}
                </div>
                <div>
                  <p className="font-medium">{p.title} {p.featured && <span className="text-xs text-primary-400">⭐</span>}</p>
                  <p className="text-xs text-slate-500">{p.techs.join(' · ') || 'No technologies'}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => openEdit(p)} className={btnGhost}>Edit</button>
                <button onClick={() => handleDelete(p)} className={`${btnGhost} hover:border-red-500/40 hover:text-red-400`}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={form.id ? 'Edit Project' : 'Add Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title">
            <input required name="title" value={form.title} onChange={onChange} placeholder="Project title" className={inputClass} />
          </Field>
          <Field label="Description">
            <textarea required name="description" value={form.description} onChange={onChange} rows={3} placeholder="Short description" className={inputClass} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="GitHub URL">
              <input name="repoUrl" value={form.repoUrl} onChange={onChange} placeholder="https://github.com/..." className={inputClass} />
            </Field>
            <Field label="Live Demo URL">
              <input name="demoUrl" value={form.demoUrl} onChange={onChange} placeholder="https://..." className={inputClass} />
            </Field>
          </div>
          <Field label="Technologies (comma separated)">
            <input name="techs" value={form.techs} onChange={onChange} placeholder="React, Node.js, PostgreSQL" className={inputClass} />
          </Field>
          <Field label="Key features (one per line)">
            <textarea name="features" value={form.features} onChange={onChange} rows={3} placeholder={'Feature 1\nFeature 2'} className={inputClass} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Screenshot">
              <div className="flex flex-col gap-2">
                {form.image && <img src={form.image} alt="preview" className="h-24 w-full rounded-lg object-cover" />}
                <label className={`${btnGhost} cursor-pointer justify-center`}>
                  {uploading ? 'Uploading...' : 'Upload image'}
                  <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
                </label>
              </div>
            </Field>
            <div className="flex flex-col justify-end gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="h-4 w-4 accent-primary-500" />
                Featured
              </label>
              <label className="text-sm">
                Order
                <input type="number" name="order" value={form.order} onChange={onChange} className={`${inputClass} mt-1`} />
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className={btnGhost}>Cancel</button>
            <button type="submit" className={btnPrimary}>{form.id ? 'Save Changes' : 'Create Project'}</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
