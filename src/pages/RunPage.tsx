
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { db, genId, type Project, type InputAttachment, type Verdict } from '../lib/db'

export default function RunPage(){
  const [sp] = useSearchParams()
  const id = sp.get('id')
  const [project, setProject] = useState<Project | undefined>(undefined)
  const nav = useNavigate()
  const [gptPaste, setGptPaste] = useState('')
  const [metaPaste, setMetaPaste] = useState('')
  const [round, setRound] = useState(1)

  useEffect(()=>{ if(id) db.projects.get(id).then(p=>{ setProject(p); if(p?.roundData?.length) setRound(p.roundData.length+1) }) },[id])

  const promptGPT = `你是 GPT，參與 AI 研究室辯論。研究問題：${project?.question||''}\n附件：${project?.inputs?.map((i)=>i.parsedText?.slice(0,200)).join('\n').slice(0,1000)}\n請提出觀點、證據與限制，繁體中文。`
  const promptMeta = `你是 Meta AI，參與 AI 研究室辯論。研究問題：${project?.question||''}\n請提出不同於 GPT 的觀點、反駁與證據，繁體中文。`

  const addRound = async ()=>{
    if(!gptPaste.trim() || !metaPaste.trim()){ alert('MANUAL MODE 必須貼上 GPT 與 Meta AI 的真實回應，禁止留空或偽造'); return }
    if (!project) return
    const judgeCycle = ['GPT','Meta','Gemini']
    const judgeId = project.judgeMode==='rotate_per_round' ? judgeCycle[(round-1)%3] : project.judgeMode==='single_ai_three_roles' ? 'GPT' : 'Gemini'
    const rd = { round, gptView: gptPaste, metaView: metaPaste, judgeId, judgeOpinion:'', raw:{ gpt: gptPaste, meta: metaPaste }, createdAt: Date.now() }
    const next = [...(project.roundData||[]), rd]
    await db.projects.update(id!, { roundData: next, status: next.length>=project.rounds ? 'judging' : 'debating', updatedAt: Date.now() })
    setProject({ ...project, roundData: next })
    setGptPaste(''); setMetaPaste(''); setRound(round+1)
  }

  if(!id) return <div className="card">請選擇專案</div>
  if(!project) return <div className="card">載入中...</div>

  return (
    <div className="grid">
      <div className="card">
        <h1>研究執行頁</h1>
        <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          <span className="badge">{project.title}</span>
          <span className="badge">回合 {project.roundData?.length||0}/{project.rounds}</span>
          <span className="badge">{project.judgeMode}</span>
          <span className="badge">{project.connectionMode}</span>
        </div>
        <div className="manual-banner" style={{marginTop:12}}>MANUAL MODE：請複製提示詞到真實 AI，貼回結果。系統不會自動呼叫 Meta AI。</div>
        <div style={{marginTop:12}} className="grid">
          <div>
            <div style={{fontSize:12, marginBottom:4}}>GPT 提示詞（可複製）</div>
            <div className="card" style={{fontSize:12, whiteSpace:'pre-wrap', background:'#0e0e18'}}>{promptGPT}</div>
            <button className="btn btn-ghost" style={{marginTop:6}} onClick={()=>navigator.clipboard.writeText(promptGPT)}>複製 GPT 提示詞</button>
          </div>
          <div>
            <div style={{fontSize:12, marginBottom:4}}>Meta AI 提示詞（可複製）</div>
            <div className="card" style={{fontSize:12, whiteSpace:'pre-wrap', background:'#0e0e18'}}>{promptMeta}</div>
            <button className="btn btn-ghost" style={{marginTop:6}} onClick={()=>navigator.clipboard.writeText(promptMeta)}>複製 Meta AI 提示詞</button>
          </div>
          <div>
            <div style={{fontSize:12, marginBottom:4}}>貼上 GPT 真實回應（保留來源標記）</div>
            <textarea className="input" value={gptPaste} onChange={e=>setGptPaste(e.target.value)} placeholder="貼上 GPT 回應..."/>
          </div>
          <div>
            <div style={{fontSize:12, marginBottom:4}}>貼上 Meta AI 真實回應（保留來源標記）</div>
            <textarea className="input" value={metaPaste} onChange={e=>setMetaPaste(e.target.value)} placeholder="貼上 Meta AI 回應..."/>
          </div>
          <button className="btn btn-primary" onClick={addRound}>＋ 新增第 {round} 回合</button>
        </div>
      </div>
      <div className="grid">
        {project.roundData?.map((r)=>(
          <div key={r.round} className="card">
            <strong>第 {r.round} 回合 · 判官 {r.judgeId}</strong>
            <div style={{marginTop:8, fontSize:12}}><b>GPT:</b> {r.gptView?.slice(0,300)}</div>
            <div style={{marginTop:8, fontSize:12}}><b>Meta:</b> {r.metaView?.slice(0,300)}</div>
            <div style={{marginTop:8}}><span className="badge">原始回應已保留</span></div>
          </div>
        ))}
      </div>
      <button className="btn btn-ghost" onClick={()=>nav(`/debate?id=${id}`)}>前往雙 AI 辯論頁 →</button>
    </div>
  )
}
