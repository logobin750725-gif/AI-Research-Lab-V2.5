
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db, type Project, type InputAttachment, type Verdict } from '../lib/db'

export default function JudgePage(){
  const [sp] = useSearchParams()
  const id = sp.get('id')
  const [project, setProject] = useState<Project | undefined>(undefined)
  useEffect(()=>{ if(id) db.projects.get(id).then(setProject) },[id])
  if(!project) return <div className="card">載入中...</div>
  const update = async (patch: Partial<Project>)=>{
    await db.projects.update(id!, { ...patch, updatedAt: Date.now() })
    setProject({ ...project, ...patch })
  }
  return (
    <div className="grid">
      <div className="card">
        <h1>輪值判官設定</h1>
        <div className="grid">
          <label style={{fontSize:12}}>判官模式</label>
          <select className="input" value={project.judgeMode} onChange={e=>update({ judgeMode: e.target.value as Project['judgeMode'] })}>
            <option value="rotate_per_round">每回合輪換判官</option>
            <option value="rotate_per_topic">每個研究主題輪換判官</option>
            <option value="three_judges">三位判官各自獨立裁決</option>
            <option value="none">不啟用第三方判官</option>
            <option value="single_ai_three_roles">單 AI 三角色替代模式</option>
          </select>
          <label style={{fontSize:12}}>辯論回合數 1～7</label>
          <input className="input" type="range" min={1} max={7} value={project.rounds} onChange={e=>update({ rounds: Number(e.target.value) })}/>
          <div className="badge">目前 {project.rounds} 回合</div>
          {project.judgeMode==='single_ai_three_roles' && <div className="manual-banner">單 AI 三角色模式：同一模型模擬研究者、反方、判官，必須清楚標示，不得冒充多個獨立模型</div>}
        </div>
      </div>
    </div>
  )
}
