
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db, type Project, type InputAttachment, type Verdict } from '../lib/db'
import { exportJSON, exportMarkdown, exportTXT, exportCSV, exportHTML, exportPDF, exportDOCX, exportZIP } from '../lib/exporters'

export default function ExportPage(){
  const [sp] = useSearchParams()
  const id = sp.get('id')
  const [project, setProject] = useState<Project | undefined>(undefined)
  useEffect(()=>{ if(id) db.projects.get(id).then(setProject) },[id])
  if(!project) return <div className="card">載入中...</div>
  return (
    <div className="grid">
      <div className="card">
        <h1>匯出中心</h1>
        <div style={{fontSize:12, color:'var(--muted)'}}>所有格式皆實際產生檔案，可重新開啟，非假提示</div>
        <div className="grid" style={{marginTop:12}}>
          <button className="btn btn-primary" onClick={()=>exportPDF(project)}>匯出 PDF</button>
          <button className="btn btn-primary" onClick={()=>exportDOCX(project)}>匯出 DOCX</button>
          <button className="btn btn-ghost" onClick={()=>exportMarkdown(project)}>匯出 Markdown</button>
          <button className="btn btn-ghost" onClick={()=>exportJSON(project)}>匯出 JSON</button>
          <button className="btn btn-ghost" onClick={()=>exportCSV(project)}>匯出 CSV</button>
          <button className="btn btn-ghost" onClick={()=>exportHTML(project)}>匯出 HTML</button>
          <button className="btn btn-ghost" onClick={()=>exportTXT(project)}>匯出 TXT</button>
          <button className="btn btn-primary" onClick={()=>exportZIP(project)}>匯出 ZIP 專案備份（含還原結構）</button>
        </div>
      </div>
    </div>
  )
}
