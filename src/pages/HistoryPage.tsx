
import { useEffect, useState } from 'react'
import { useStore } from '../stores/useStore'
import { useNavigate } from 'react-router-dom'
import { db, type Project, type InputAttachment, type Verdict } from '../lib/db'

export default function HistoryPage(){
  const { projects, load, deleteProject } = useStore()
  const [q, setQ] = useState('')
  const [trash, setTrash] = useState<Project[]>([])
  const nav = useNavigate()
  useEffect(()=>{ load() },[])
  const filtered = projects.filter(p=> p.title.includes(q) || p.question.includes(q))

  const onDelete = async (id:string)=>{
    if(!confirm('刪除確認：確定刪除此研究？')) return
    const p = await db.projects.get(id)
    if(p) setTrash([...trash, p])
    await deleteProject(id)
  }

  const restore = async (p: Project)=>{
    await db.projects.add(p)
    setTrash(trash.filter((t)=>t.id!==p.id))
    load()
  }

  const importJSON = async (file: File)=>{
    try{
      const text = await file.text()
      const data = JSON.parse(text)
      if(!data.id) throw new Error('缺少 Project ID')
      await db.projects.put({ ...data, updatedAt: Date.now() })
      load()
      alert('匯入成功')
    }catch(e: unknown){ alert(`匯入損壞檔案處理：${e instanceof Error ? e.message : String(e)}`) }
  }

  return (
    <div className="grid">
      <div className="card">
        <h1>研究歷史</h1>
        <input className="input" placeholder="搜尋標題或問題..." value={q} onChange={e=>setQ(e.target.value)}/>
        <div style={{marginTop:8}}><input type="file" accept=".json,.zip" onChange={e=> e.target.files && importJSON(e.target.files[0])} /></div>
      </div>
      <div className="grid">
        {filtered.map(p=>(
          <div key={p.id} className="card">
            <div style={{display:'flex', justifyContent:'space-between'}}><strong>{p.title}</strong><span className="badge">{p.status}</span></div>
            <div style={{fontSize:12, color:'var(--muted)', marginTop:6}}>{p.question.slice(0,80)}</div>
            <div style={{display:'flex', gap:8, marginTop:12, flexWrap:'wrap'}}>
              <button className="btn btn-primary" onClick={()=>nav(`/run?id=${p.id}`)}>續接</button>
              <button className="btn btn-ghost" onClick={()=>nav(`/report?id=${p.id}`)}>報告</button>
              <button className="btn btn-ghost" onClick={()=>onDelete(p.id)}>刪除</button>
            </div>
          </div>
        ))}
      </div>
      {trash.length>0 && <div className="card"><h2>復原區</h2>{trash.map((t)=><div key={t.id} style={{display:'flex', justifyContent:'space-between', marginTop:8}}><span>{t.title}</span><button className="btn btn-ghost" onClick={()=>restore(t)}>復原</button></div>)}</div>}
    </div>
  )
}
