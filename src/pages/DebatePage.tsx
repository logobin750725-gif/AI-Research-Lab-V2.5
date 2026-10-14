
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db, genId, type Project, type InputAttachment, type Verdict } from '../lib/db'

export default function DebatePage(){
  const [sp] = useSearchParams()
  const id = sp.get('id')
  const [project, setProject] = useState<Project | undefined>(undefined)
  useEffect(()=>{ if(id) db.projects.get(id).then(setProject) },[id])
  const [judgeOpinion, setJudgeOpinion] = useState('')
  const [selectedRound, setSelectedRound] = useState<number>(1)

  const submitJudge = async ()=>{
    if(!project) return
    const idx = project.roundData.findIndex((r)=>r.round===selectedRound)
    if(idx<0){ alert('回合不存在'); return }
    if(!judgeOpinion.trim()){ alert('請輸入判官意見'); return }
    project.roundData[idx].judgeOpinion = judgeOpinion
    project.roundData[idx].raw.gemini = judgeOpinion
    await db.projects.update(id!, { roundData: project.roundData, updatedAt: Date.now() })
    setProject({ ...project })
    setJudgeOpinion('')
    alert('判官意見已保存')
  }

  const finalizeVerdict = async (result: Verdict['result'])=>{
    if (!project) return
    const evId = genId()
    const verdict: Verdict = {
      result,
      judge: project.roundData?.[project.roundData.length-1]?.judgeId || 'Gemini',
      reasoning: judgeOpinion || `根據 ${project.roundData.length} 回合辯論，${result}。`,
      evidenceIds: project.evidences.map((e)=>e.id).slice(0,3),
      createdAt: Date.now()
    }
    await db.projects.update(id!, { verdict, status:'completed', evidences: [...project.evidences, { id: evId, sourceName:'使用者手動裁決', obtainedAt: Date.now(), claim: project.question, summary:'多回合辯論彙整，尚未獨立查證', verified:'unverified', confidence: 0, reason:'由使用者選擇結果，系統未驗證證據或計算信心' }], updatedAt: Date.now() })
    setProject({ ...project, verdict })
    alert('已產生最終報告')
  }

  if(!project) return <div className="card">載入中...</div>
  return (
    <div className="grid">
      <div className="card">
        <h1>雙 AI 辯論頁</h1>
        <div style={{display:'flex', gap:8}}><span className="badge">GPT 固定</span><span className="badge">Meta AI 固定</span><span className="badge">禁止偽裝同一模型</span></div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
          <div className="card" style={{background:'#1a1530'}}>
            <strong>AI-A：GPT</strong>
            <div style={{fontSize:12, marginTop:8, whiteSpace:'pre-wrap'}}>{project.roundData?.[selectedRound-1]?.gptView || '尚未有回應，請在執行頁貼上'}</div>
          </div>
          <div className="card" style={{background:'#0f1f1a'}}>
            <strong>AI-B：Meta AI</strong>
            <div style={{fontSize:12, marginTop:8, whiteSpace:'pre-wrap'}}>{project.roundData?.[selectedRound-1]?.metaView || '尚未有回應，請在執行頁貼上'}</div>
          </div>
        </div>
        <div style={{marginTop:12}}>
          <div style={{fontSize:12, marginBottom:4}}>選擇回合</div>
          <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
            {project.roundData?.map((r)=><button key={r.round} className={`btn ${selectedRound===r.round?'btn-primary':'btn-ghost'}`} onClick={()=>setSelectedRound(r.round)}>{r.round}</button>)}
          </div>
        </div>
      </div>

      <div className="card">
        <h2>輪值判官設定 / 裁決</h2>
        <div style={{fontSize:12, color:'var(--muted)'}}>判官必須根據證據品質、邏輯一致性、反駁有效性及不確定性裁決，不得多數決</div>
        <textarea className="input" style={{marginTop:8}} placeholder="輸入判官意見（Gemini / GPT / Meta 輪值）" value={judgeOpinion} onChange={e=>setJudgeOpinion(e.target.value)}/>
        <button className="btn btn-primary" style={{marginTop:8}} onClick={submitJudge}>保存判官意見到第 {selectedRound} 回合</button>
        <div style={{display:'flex', gap:8, flexWrap:'wrap', marginTop:12}}>
          <button className="btn btn-ghost" onClick={()=>finalizeVerdict('SUPPORT_A')}>支持 A (GPT)</button>
          <button className="btn btn-ghost" onClick={()=>finalizeVerdict('SUPPORT_B')}>支持 B (Meta)</button>
          <button className="btn btn-ghost" onClick={()=>finalizeVerdict('BOTH_PARTIAL')}>雙方各有成立</button>
          <button className="btn btn-ghost" onClick={()=>finalizeVerdict('INSUFFICIENT')}>證據不足</button>
          <button className="btn btn-ghost" onClick={()=>finalizeVerdict('UNDECIDABLE')}>無法裁決</button>
        </div>
      </div>
    </div>
  )
}
