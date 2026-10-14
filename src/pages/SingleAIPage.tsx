
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db, type Project, type InputAttachment, type Verdict } from '../lib/db'

export default function SingleAIPage(){
  const [sp] = useSearchParams()
  const id = sp.get('id')
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [researcher, setResearcher] = useState('')
  const [opponent, setOpponent] = useState('')
  const [judge, setJudge] = useState('')
  useEffect(()=>{ if(id) db.projects.get(id).then(setProject) },[id])
  const save = async ()=>{
    if(!project) return
    const rd = { round: (project.roundData?.length||0)+1, gptView: `【研究者】${researcher}\n【反方】${opponent}\n【判官】${judge}`, metaView: '單 AI 三角色模式 - 同一模型模擬三角色，已標示', judgeId:'GPT', judgeOpinion: judge, raw:{ gpt: researcher, meta: opponent, gemini: judge }, createdAt: Date.now() }
    const next = [...(project.roundData||[]), rd]
    await db.projects.update(id!, { roundData: next, judgeMode:'single_ai_three_roles', status:'completed', updatedAt: Date.now() })
    setProject({ ...project, roundData: next })
    setResearcher(''); setOpponent(''); setJudge('')
    alert('單 AI 三角色已保存，明確標示為同一模型模擬')
  }
  if(!project) return <div className="card">載入中...</div>
  return (
    <div className="grid">
      <div className="card">
        <h1>單 AI 三角色模式</h1>
        <div className="manual-banner">此模式為同一模型模擬不同觀點，不得冒充多個獨立模型，已在 UI 明確標示</div>
        <div className="grid" style={{marginTop:12}}>
          <label style={{fontSize:12}}>研究者觀點</label>
          <textarea className="input" value={researcher} onChange={e=>setResearcher(e.target.value)} placeholder="研究者..."/>
          <label style={{fontSize:12}}>反方觀點</label>
          <textarea className="input" value={opponent} onChange={e=>setOpponent(e.target.value)} placeholder="反方..."/>
          <label style={{fontSize:12}}>判官觀點</label>
          <textarea className="input" value={judge} onChange={e=>setJudge(e.target.value)} placeholder="判官..."/>
          <button className="btn btn-primary" onClick={save}>保存三角色回合</button>
        </div>
      </div>
    </div>
  )
}
