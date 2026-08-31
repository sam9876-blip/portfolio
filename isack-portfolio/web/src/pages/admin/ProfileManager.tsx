import { useEffect, useState } from 'react'
import { api, type Profile } from '../../services/api'
import { inputClass, btnPrimary, btnGhost, Field } from './ui'

export default function ProfileManager() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [status, setStatus] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => {})
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile!, [e.target.name]: e.target.value })
  }

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const { url } = await api.uploadImage(file)
      setProfile({ ...profile!, image: url })
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUploading(false)
    }
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Saving...')
    try {
      await api.updateProfile(profile!)
      setStatus('Saved successfully')
      setTimeout(() => setStatus(''), 3000)
    } catch (err: any) {
      setStatus(err.message)
    }
  }

  if (!profile) return <p>Loading...</p>

  return (
    <form onSubmit={save} className="max-w-3xl">
      <h2 className="mb-6 font-display text-2xl font-bold">Profile</h2>
      <div className="card space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name"><input name="name" value={profile.name} onChange={onChange} className={inputClass} /></Field>
          <Field label="Title / Role"><input name="title" value={profile.title} onChange={onChange} className={inputClass} /></Field>
        </div>
        <Field label="Short intro (hero)">
          <textarea name="intro" value={profile.intro} onChange={onChange} rows={2} className={inputClass} />
        </Field>
        <Field label="Bio">
          <textarea name="bio" value={profile.bio} onChange={onChange} rows={5} className={inputClass} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email"><input name="email" value={profile.email} onChange={onChange} className={inputClass} /></Field>
          <Field label="Phone"><input name="phone" value={profile.phone} onChange={onChange} className={inputClass} /></Field>
          <Field label="GitHub URL"><input name="github" value={profile.github || ''} onChange={onChange} className={inputClass} /></Field>
          <Field label="LinkedIn URL"><input name="linkedin" value={profile.linkedin || ''} onChange={onChange} className={inputClass} /></Field>
          <Field label="Location"><input name="location" value={profile.location || ''} onChange={onChange} className={inputClass} /></Field>
          <Field label="Resume URL"><input name="resumeUrl" value={profile.resumeUrl || ''} onChange={onChange} className={inputClass} /></Field>
        </div>
        <Field label="Profile image">
          <div className="flex flex-col gap-2">
            {profile.image && <img src={profile.image} alt="profile" className="h-28 w-28 rounded-xl object-cover" />}
            <label className={`${btnGhost} w-fit cursor-pointer`}>
              {uploading ? 'Uploading...' : 'Upload image'}
              <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
            </label>
          </div>
        </Field>
        <div className="flex items-center gap-4">
          <button type="submit" className={btnPrimary}>Save Changes</button>
          {status && <span className="text-sm text-accent-400">{status}</span>}
        </div>
      </div>
    </form>
  )
}
