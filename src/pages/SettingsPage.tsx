
import { useStore } from '../stores/useStore'
import { db, type Project, type InputAttachment, type Verdict } from '../lib/db'

export default function SettingsPage(){
  const { providerStatus } = useStore()
  const clearAll = async ()=>{
    if(!confirm('確定清除所有 IndexedDB 研究資料？此動作不可復原')) return
    await db.projects.clear()
    location.reload()
  }
  return (
    <div className="grid">
      <div className="card">
        <h1>系統設定</h1>
        <h2>模型與連線狀態（真實性硬規則）</h2>
        {providerStatus.map(s=>(
          <div key={s.provider} className="card" style={{background:'#0e0e18', marginTop:8}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><strong>{s.provider} ({s.modelId})</strong><span className="badge" style={{background: s.connected? '#1a3a2a':'#3a1a1a'}}>{s.mode}</span></div>
            <div style={{fontSize:11, color:'var(--muted)', marginTop:6}}>{s.lastError}</div>
            <div style={{fontSize:11, color:'var(--muted)'}}>最後檢查 {new Date(s.lastChecked).toLocaleString()}</div>
          </div>
        ))}
        <div className="manual-banner" style={{marginTop:12}}>已驗證連線模式：需合法 API、授權、通過測試才標記 CONNECTED。否則顯示 MANUAL MODE，手動貼上真實回應。</div>
        <h2>隱私與資料</h2>
        <div style={{fontSize:12, color:'var(--muted)'}}>• 不把 API Key、Token 硬編碼到前端<br/>• 私人使用優先<br/>• IndexedDB 本地保存<br/>• 不覆蓋必勝羅盤 V40 正式環境</div>
        <h2>連線狀態</h2>
        <div style={{fontSize:12}}><span className="badge">離線能力：請於首次載入後驗證</span> <span className="badge">iPhone Safari：尚未實機驗證</span></div>
        <h2>資料管理</h2>
        <button className="btn btn-ghost" onClick={clearAll} style={{color:'var(--danger)', borderColor:'var(--danger)'}}>清除所有研究資料（危險）</button>
        <div style={{marginTop:12, fontSize:11, color:'var(--muted)'}}>AI 研究室 V2.5 獨立專案、獨立部署、Vercel / Cloudflare Pages</div>
      </div>
    </div>
  )
}
