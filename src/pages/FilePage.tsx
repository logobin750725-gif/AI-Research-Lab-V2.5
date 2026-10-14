
import { useEffect, useState } from 'react'
import { db, type Project, type InputAttachment, type Verdict } from '../lib/db'
import { exportZIP } from '../lib/exporters'

export default function FilePage(){
  const [projects, setProjects] = useState<Project[]>([])
  useEffect(()=>{ db.projects.toArray().then(setProjects) },[])
  const totalSize = projects.reduce((s,p)=> s + JSON.stringify(p).length,0)
  const backupAll = async ()=>{
    const { default: JSZip } = await import('jszip')
    const zip = new JSZip()
    projects.forEach(p=> zip.file(`${p.id}.json`, JSON.stringify(p,null,2)))
    const blob = await zip.generateAsync({ type:'blob' })
    const { saveAs } = await import('file-saver')
    saveAs(blob, `ai-lab-backup-${Date.now()}.zip`)
  }
  return (
    <div className="grid">
      <div className="card">
        <h1>檔案管理</h1>
        <div style={{fontSize:12, color:'var(--muted)'}}>附件、專案備份、匯入與還原 · IndexedDB 總大小約 {(totalSize/1024).toFixed(1)} KB</div>
        <div className="grid" style={{marginTop:12}}>
          <button className="btn btn-primary" onClick={backupAll}>一鍵備份全部專案 ZIP</button>
          <div style={{fontSize:12}}>專案數 {projects.length}</div>
          {projects.map(p=>(
            <div key={p.id} className="card" style={{background:'#0e0e18'}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><span>{p.title}</span><button className="btn btn-ghost" onClick={()=>exportZIP(p)}>備份</button></div>
              <div style={{fontSize:11, color:'var(--muted)', marginTop:6}}>附件 {p.inputs?.length||0} · 證據 {p.evidences?.length||0}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
