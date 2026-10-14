
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db, type Project, type InputAttachment, type Verdict } from '../lib/db'

export default function ReportPage(){
  const [sp] = useSearchParams()
  const id = sp.get('id')
  const [project, setProject] = useState<Project | undefined>(undefined)
  useEffect(()=>{ if(id) db.projects.get(id).then(setProject) },[id])
  if(!project) return <div className="card">載入中...</div>
  return (
    <div className="grid">
      <div className="card">
        <h1>最終研究報告</h1>
        <div className="badge">{project.title}</div>
        <h2>結論</h2>
        <div style={{fontSize:13, whiteSpace:'pre-wrap'}}>{project.verdict?.reasoning || '尚未裁決，請在辯論頁完成判官流程'}</div>
        <h2>證據</h2>
        {project.evidences?.map((e)=>(
          <div key={e.id} className="card" style={{background:'#0e0e18', marginTop:8}}>
            <div style={{fontSize:12}}><b>Evidence ID:</b> {e.id} · <b>{e.sourceName}</b> · 信心 {e.confidence}%</div>
            <div style={{fontSize:12, color:'var(--muted)'}}>主張: {e.claim}</div>
            <div style={{fontSize:12}}>{e.summary}</div>
            <div style={{fontSize:11, color:'var(--muted)'}}>驗證: {e.verified} · 理由: {e.reason} · {new Date(e.obtainedAt).toLocaleString()}</div>
            {e.sourceUrl && <div style={{fontSize:11}}><a href={e.sourceUrl} target="_blank" style={{color:'var(--accent)'}}>{e.sourceUrl}</a></div>}
            {e.conflict && <div style={{fontSize:11, color:'var(--danger)'}}>衝突: {e.conflict}</div>}
          </div>
        ))}
        <h2>反對意見與限制</h2>
        <div style={{fontSize:12, color:'var(--muted)'}}>
          {project.roundData?.map((r)=>`回合${r.round} 反駁：GPT ${r.gptRebuttal||'無'} / Meta ${r.metaRebuttal||'無'}`).join('\n') || '無'}
        </div>
        <h2>未解決爭議</h2>
        <div style={{fontSize:12}}>{project.unresolved?.join('\n') || '無，或已在裁決中說明'}</div>
        <div style={{marginTop:12}}><span className="badge">裁決結果: {project.verdict?.result || '未裁決'}</span></div>
      </div>
    </div>
  )
}
