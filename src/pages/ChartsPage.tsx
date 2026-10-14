
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db, type Project, type InputAttachment, type Verdict } from '../lib/db'

export default function ChartsPage(){
  const [sp] = useSearchParams()
  const id = sp.get('id')
  const [project, setProject] = useState<Project | undefined>(undefined)
  useEffect(()=>{ if(id) db.projects.get(id).then(setProject) },[id])
  if(!project) return <div className="card">載入中...</div>
  return (
    <div className="grid">
      <div className="card">
        <h1>圖表與比較</h1>
        <h2>多方案比較</h2>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <div className="card" style={{background:'#1a1530'}}><div style={{fontSize:12}}>GPT 方案</div><div style={{fontSize:18, fontWeight:800}}>{project.roundData?.length||0} 回合觀點</div><div style={{fontSize:11, color:'var(--muted)'}}>證據數 {project.evidences?.length||0}</div></div>
          <div className="card" style={{background:'#0f1f1a'}}><div style={{fontSize:12}}>Meta AI 方案</div><div style={{fontSize:18, fontWeight:800}}>{project.roundData?.length||0} 回合觀點</div><div style={{fontSize:11, color:'var(--muted)'}}>信心 {project.evidences?.[0]?.confidence || 0}%</div></div>
        </div>
        <h2>證據權重</h2>
        <div className="grid">
          {project.evidences?.map((e)=>(
            <div key={e.id} className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span style={{fontSize:12}}>{e.sourceName}</span>
              <div style={{width:120, height:8, background:'#232336', borderRadius:4}}><div style={{width:`${e.confidence}%`, height:'100%', background:'var(--accent)', borderRadius:4}}></div></div>
              <span className="badge">{e.confidence}%</span>
            </div>
          ))}
        </div>
        <h2>爭議項目</h2>
        <div style={{fontSize:12, color:'var(--muted)'}}>{project.unresolved?.length? project.unresolved.join(', '): '暫無爭議，或已全部裁決'}</div>
      </div>
    </div>
  )
}
