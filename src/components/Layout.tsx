
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
const tabs = [
  { to:'/', label:'首頁', icon:'🏠' },
  { to:'/input', label:'輸入', icon:'📎' },
  { to:'/run', label:'執行', icon:'⚙️' },
  { to:'/debate', label:'辯論', icon:'⚔️' },
  { to:'/report', label:'報告', icon:'📄' },
  { to:'/history', label:'歷史', icon:'🕘' },
]
const extra = [
  { to:'/judge', label:'判官' },
  { to:'/single', label:'三角色' },
  { to:'/charts', label:'圖表' },
  { to:'/export', label:'匯出' },
  { to:'/files', label:'檔案' },
  { to:'/settings', label:'設定' },
]
export default function Layout(){
  const loc = useLocation()
  const nav = useNavigate()
  return (
    <>
      <div className="nav">
        <div style={{fontWeight:800}}>AI 研究室 V2.5</div>
        <div style={{display:'flex', gap:6, overflow:'auto'}}>
          {extra.map(e=><button key={e.to} className="btn btn-ghost" style={{padding:'4px 8px', fontSize:11}} onClick={()=>nav(e.to+loc.search)}>{e.label}</button>)}
        </div>
      </div>
      <div className="main"><Outlet/></div>
      <div className="tabbar">
        {tabs.map(t=>(
          <NavLink key={t.to} to={t.to} className={({isActive})=> isActive?'active':''}>
            <span style={{fontSize:18}}>{t.icon}</span><span>{t.label}</span>
          </NavLink>
        ))}
      </div>
    </>
  )
}
