import { api, type Experience } from '../../services/api'
import { inputClass, btnPrimary, btnGhost, Empty, Field } from './ui'

export default function ExperienceManager({
  experience,
  setExperience,
}: {
  experience: Experience[]
  setExperience: React.Dispatch<React.SetStateAction<Experience[]>>
}) {
  const addEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data: any = {
      role: String(fd.get('role')),
      company: String(fd.get('company')),
      location: String(fd.get('location')) || undefined,
      startDate: String(fd.get('startDate')),
      endDate: String(fd.get('endDate')) || undefined,
      current: fd.get('current') === 'on',
      description: String(fd.get('description')),
      order: experience.length,
    }
    const created = await api.createExperience(data)
    setExperience((prev) => [...prev, created])
    e.currentTarget.reset()
  }

  const removeEntry = async (ex: Experience) => {
    if (!confirm(`Remove "${ex.role}"?`)) return
    await api.deleteExperience(ex.id)
    setExperience((prev) => prev.filter((x) => x.id !== ex.id))
  }

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-bold">Experience</h2>

      <form onSubmit={addEntry} className="card mb-6">
        <h3 className="mb-4 font-semibold">Add experience</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Role"><input required name="role" className={inputClass} placeholder="Software Engineer" /></Field>
          <Field label="Company"><input required name="company" className={inputClass} placeholder="Acme Corp" /></Field>
          <Field label="Location"><input name="location" className={inputClass} placeholder="Nairobi, Kenya" /></Field>
          <Field label="Start date"><input required name="startDate" className={inputClass} placeholder="Jan 2024" /></Field>
          <Field label="End date"><input name="endDate" className={inputClass} placeholder="Dec 2024 (leave empty if current)" /></Field>
        </div>
        <Field label="Description">
          <textarea name="description" rows={3} className={inputClass} placeholder="What you did..." />
        </Field>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input type="checkbox" name="current" className="h-4 w-4 accent-primary-500" /> Currently working here
        </label>
        <div className="mt-4"><button className={btnPrimary} type="submit">Add Entry</button></div>
      </form>

      {experience.length === 0 ? (
        <Empty text="No experience entries yet." />
      ) : (
        <div className="space-y-3">
          {experience.map((ex) => (
            <div key={ex.id} className="card flex items-center justify-between gap-3">
              <div>
                <p className="font-medium">{ex.role} {ex.current && <span className="text-xs text-emerald-400">● Current</span>}</p>
                <p className="text-sm text-primary-400">{ex.company}</p>
                <p className="text-xs text-slate-500">{ex.startDate} - {ex.current ? 'Present' : ex.endDate}</p>
              </div>
              <button onClick={() => removeEntry(ex)} className={`${btnGhost} !px-3 !py-1.5 text-xs hover:border-red-500/40 hover:text-red-400`}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
