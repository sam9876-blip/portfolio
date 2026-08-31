import { api, type Skill } from '../../services/api'
import { inputClass, btnPrimary, btnGhost, Empty, Field } from './ui'

const iconOptions = ['code', 'react', 'node', 'python', 'database', 'git', 'docker', 'flutter', 'globe', 'server', 'cpu', 'cloud']

export default function SkillsManager({
  skills,
  setSkills,
}: {
  skills: Skill[]
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>
}) {
  const addSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = {
      name: String(fd.get('name')),
      level: Number(fd.get('level')),
      icon: String(fd.get('icon') || 'code'),
      order: skills.length,
    }
    const created = await api.createSkill(data)
    setSkills((prev) => [...prev, created])
  }

  const updateSkill = async (s: Skill, patch: Partial<Skill>) => {
    const updated = await api.updateSkill(s.id, { ...s, ...patch })
    setSkills((prev) => prev.map((x) => (x.id === s.id ? updated : x)))
  }

  const removeSkill = async (s: Skill) => {
    if (!confirm(`Remove "${s.name}"?`)) return
    await api.deleteSkill(s.id)
    setSkills((prev) => prev.filter((x) => x.id !== s.id))
  }

  const renderOptions = (current: string | null | undefined) =>
    iconOptions.map((o) => (
      <option key={o} value={o} selected={o === current}>{o}</option>
    ))

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-bold">Skills</h2>

      <form onSubmit={addSkill} className="card mb-6">
        <h3 className="mb-4 font-semibold">Add skill</h3>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm">Name</label>
            <input required name="name" className={inputClass} placeholder="React / Next.js" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm">Level (0-100)</label>
            <input required type="number" name="level" min={0} max={100} className={inputClass} placeholder="85" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm">Icon</label>
            <select name="icon" className={inputClass}>{renderOptions(null)}</select>
          </div>
        </div>
        <div className="mt-4">
          <button className={btnPrimary} type="submit">Add Skill</button>
        </div>
      </form>

      {skills.length === 0 ? (
        <Empty text="No skills yet." />
      ) : (
        <div className="space-y-3">
          {skills.map((s) => (
            <div key={s.id} className="card flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3">
                <span className="w-32 shrink-0 text-sm font-medium">{s.name}</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={s.level}
                  onChange={(e) => updateSkill(s, { level: Number(e.target.value) })}
                  className="flex-1 accent-primary-500"
                />
                <span className="w-10 text-right font-mono text-sm text-accent-400">{s.level}%</span>
              </div>
              <div className="flex shrink-0 gap-2">
                <select
                  value={s.icon || 'code'}
                  onChange={(e) => updateSkill(s, { icon: e.target.value })}
                  className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs"
                >
                  {renderOptions(s.icon)}
                </select>
                <button onClick={() => removeSkill(s)} className={`${btnGhost} !px-3 !py-1.5 text-xs hover:border-red-500/40 hover:text-red-400`}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
