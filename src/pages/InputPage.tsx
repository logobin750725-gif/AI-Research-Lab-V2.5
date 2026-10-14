
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db, genId, type Project, type InputAttachment, type Verdict } from '../lib/db'
import { parseFile } from '../lib/parser'
import { useStore } from '../stores/useStore'

export default function InputPage(){
  const [sp] = useSearchParams()
  const id = sp.get('id')
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const { updateProject } = useStore()

  useEffect(()=>{
    if(!id) return
    db.projects.get(id).then(setProject)
  },[id])

  const addAttachment = async (obj: InputAttachment)=>{
    if(!project) return
    const next = [...project.inputs, obj]
    await db.projects.update(id!, { inputs: next, updatedAt: Date.now() })
    setProject({ ...project, inputs: next })
  }

  const onFiles = async (files: FileList | null)=>{
    if(!files) return
    for(const f of Array.from(files)){
      if(f.size> 20*1024*1024){ alert(`${f.name} 超過 20MB`); continue }
      try{
        const parsed = await parseFile(f)
        await addAttachment({ id: genId(), type: parsed.type, name: f.name, size: f.size, dataUrl: parsed.dataUrl, parsedText: parsed.text, createdAt: Date.now() })
      }catch(e: unknown){ alert(`解析 ${f.name} 失敗: ${e instanceof Error ? e.message : String(e)}`) }
    }
  }

  const addText = async ()=>{
    if(!text.trim()) return
    await addAttachment({ id: genId(), type:'text', name:'文字輸入', parsedText:text, createdAt: Date.now() })
    setText('')
  }
  const addUrl = async ()=>{
    if(!url.trim()) return
    try{ new URL(url) }catch{ alert('網址格式錯誤'); return }
    await addAttachment({ id: genId(), type:'url', name:url, url, parsedText:url, createdAt: Date.now() })
    setUrl('')
  }

  if(!id) return <div className="card">請先從首頁建立專案</div>
  if(!project) return <div className="card">載入中...</div>

  return (
    <div className="grid">
      <div className="card">
        <h1>多模態輸入</h1>
        <div className="badge">{project.title} · {project.inputs.length} 附件</div>
        <div style={{marginTop:12}} className="grid">
          <textarea className="input" placeholder="文字、Markdown..." value={text} onChange={e=>setText(e.target.value)}/>
          <button className="btn btn-primary" onClick={addText}>加入文字</button>
          <input className="input" placeholder="https://..." value={url} onChange={e=>setUrl(e.target.value)}/>
          <button className="btn btn-ghost" onClick={addUrl}>加入網址</button>
          <div>
            <div style={{fontSize:12, color:'var(--muted)', marginBottom:6}}>圖片、PDF、DOCX、XLSX、TXT、音訊</div>
            <input type="file" multiple accept="image/*,.pdf,.docx,.xlsx,.txt,.md,audio/*" onChange={e=>onFiles(e.target.files)} />
          </div>
          <div>
            <div style={{fontSize:12, color:'var(--muted)', marginBottom:6}}>錄音（iPhone 支援）</div>
            <input type="file" accept="audio/*" capture onChange={e=>onFiles(e.target.files)} />
          </div>
        </div>
      </div>
      <h2>已加入附件</h2>
      <div className="grid">
        {project.inputs.map((inp)=>(
          <div key={inp.id} className="card">
            <div style={{display:'flex', justifyContent:'space-between'}}><strong>{inp.type}</strong><span className="badge">{inp.name?.slice(0,30)}</span></div>
            {inp.dataUrl && inp.type==='image' && <img src={inp.dataUrl} style={{width:'100%', borderRadius:12, marginTop:8}}/>}
            <div style={{fontSize:12, color:'var(--muted)', marginTop:8, whiteSpace:'pre-wrap', maxHeight:120, overflow:'auto'}}>{inp.parsedText?.slice(0,500)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
