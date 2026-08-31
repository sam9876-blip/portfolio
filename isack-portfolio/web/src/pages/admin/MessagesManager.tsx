import { api, type Message } from '../../services/api'
import { Empty } from './ui'

export default function MessagesManager({
  messages,
  setMessages,
}: {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}) {
  const markRead = async (m: Message, read: boolean) => {
    const updated = await api.markMessageRead(m.id, read)
    setMessages((prev) => prev.map((x) => (x.id === m.id ? updated : x)))
  }

  const handleDelete = async (m: Message) => {
    if (!confirm('Delete this message?')) return
    await api.deleteMessage(m.id)
    setMessages((prev) => prev.filter((x) => x.id !== m.id))
  }

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-bold">Messages</h2>
      {messages.length === 0 ? (
        <Empty text="No messages received yet." />
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`card ${!m.read ? 'border-primary-400/40' : ''}`}
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{m.name}</span>
                  {!m.read && <span className="rounded-full bg-primary-500/20 px-2 py-0.5 text-xs text-primary-300">New</span>}
                </div>
                <span className="text-xs text-slate-500">{new Date(m.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-sm text-slate-400">{m.subject}</p>
              <p className="mt-2 text-sm whitespace-pre-wrap text-slate-600 dark:text-slate-300">{m.body}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                <a href={`mailto:${m.email}`} className="hover:text-primary-400">✉ {m.email}</a>
                {m.phone && <span>📞 {m.phone}</span>}
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => markRead(m, !m.read)} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:bg-white/5">
                  {m.read ? 'Mark unread' : 'Mark read'}
                </button>
                <button onClick={() => handleDelete(m)} className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
