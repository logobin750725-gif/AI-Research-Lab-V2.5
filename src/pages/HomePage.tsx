
import { useEffect, useState } from 'react'
import { useStore } from '../stores/useStore'
import { useNavigate } from 'react-router-dom'

export default function HomePage(){
  const { projects, load, createProject } = useStore()
  const [title, setTitle] = useState('')
  const [q, setQ] = useState('')
  const nav = useNavigate()
  useEffect(()=>{ load() },[])
  const create = async ()=>{
    if(!q.trim()){ alert('請輸入研究問題'); return }
    const id = await createProject(title, q)
    nav(`/input?id=${id}`)
  }
  return (
    <div className="grid">
      <div className="manual-banner">⚠️ 當前為 MANUAL MODE：GPT / Meta AI / Gemini 皆需手動貼上真實回應，禁止偽造自動連線</div>
      <div className="card">
        <h1>研究室首頁</h1>
        <p style={{color:'var(--muted)', fontSize:13}}>建立研究、最近專案、研究狀態</p>
        <input className="input" placeholder="研究標題（例如：AI 晶片趨勢）" value={title} onChange={e=>setTitle(e.target.value)} style={{marginTop:12}}/>
        <textarea className="input" placeholder="輸入原始研究問題..." value={q} onChange={e=>setQ(e.target.value)} style={{marginTop:12}}/>
        <button className="btn btn-primary" style={{marginTop:12, width:'100%'}} onClick={create}>＋ 建立研究專案</button>
      </div>
      <h2>最近專案 ({projects.length})</h2>
      <div className="grid">
        {projects.map(p=>(
          <div key={p.id} className="card" onClick={()=>nav(`/run?id=${p.id}`)} style={{cursor:'pointer'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <strong>{p.title}</strong><span className="badge">{p.status}</span>
            </div>
            <div style={{fontSize:12, color:'var(--muted)', marginTop:6, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{p.question}</div>
            <div style={{fontSize:11, color:'var(--muted)', marginTop:6}}>{new Date(p.updatedAt).toLocaleString('zh-TW')} · {p.rounds} 回合 · {p.connectionMode}</div>
          </div>
        ))}
        {projects.length===0 && <div className="card" style={{color:'var(--muted)'}}>尚無專案，建立第一個吧</div>}
      </div>
      <div className="card">
        <h2 style={{marginTop:0}}>系統狀態</h2>
        <div style={{fontSize:12, lineHeight:1.8, color:'var(--muted)'}}>
          • PWA Manifest 有效 · Service Worker 自動更新<br/>
          • IndexedDB 持久化 · 離線可開啟<br/>
          • GPT 角色固定 · Meta AI 角色固定 · 不偽裝<br/>
          • 支援 1～7 回合辯論與 5 種判官模式
        </div>
      </div>
    </div>
  )
}
