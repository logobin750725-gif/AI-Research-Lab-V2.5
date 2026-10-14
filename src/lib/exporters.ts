
import { Project } from './db'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

export function exportJSON(p: Project){
  const blob = new Blob([JSON.stringify(p, null, 2)], { type: 'application/json' })
  saveAs(blob, `${p.title}-${p.id}.json`)
}
export function exportMarkdown(p: Project){
  let md = `# ${p.title}\n\n## 研究問題\n${p.question}\n\n## 辯論紀錄\n`
  p.roundData.forEach(r=>{
    md += `### 第 ${r.round} 回合\n**GPT:** ${r.gptView||''}\n\n**Meta AI:** ${r.metaView||''}\n\n**判官 ${r.judgeId}:** ${r.judgeOpinion||''}\n\n`
  })
  if(p.verdict) md += `## 最終裁決\n${p.verdict.reasoning}\n結果: ${p.verdict.result}\n`
  md += `\n## 證據\n` + p.evidences.map(e=>`- [${e.sourceName}] ${e.summary} (${e.confidence}%)`).join('\n')
  const blob = new Blob([md], { type: 'text/markdown' })
  saveAs(blob, `${p.title}.md`)
}
export function exportTXT(p: Project){
  const blob = new Blob([`標題:${p.title}\n問題:${p.question}\n\n`+JSON.stringify(p.roundData,null,2)], { type: 'text/plain' })
  saveAs(blob, `${p.title}.txt`)
}
export function exportCSV(p: Project){
  const rows = [['round','gpt','meta','judge','opinion']]
  p.roundData.forEach(r=>rows.push([String(r.round), (r.gptView||'').replace(/"/g,'""'), (r.metaView||'').replace(/"/g,'""'), r.judgeId||'', (r.judgeOpinion||'').replace(/"/g,'""')]))
  const csv = rows.map(r=>r.map(v=>`"${v}"`).join(',')).join('\n')
  saveAs(new Blob([csv], { type: 'text/csv' }), `${p.title}.csv`)
}
export function exportHTML(p: Project){
  const escape = (text: string) => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] ?? char))
  const html = `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><title>${escape(p.title)}</title><body style="font-family:system-ui;padding:24px;background:#0a0a0f;color:#e5e7eb"><h1>${escape(p.title)}</h1><p>${escape(p.question)}</p><pre>${escape(JSON.stringify(p,null,2))}</pre></body></html>`
  saveAs(new Blob([html], { type: 'text/html' }), `${p.title}.html`)
}
export async function exportPDF(p: Project){
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF()
  doc.setFont('helvetica')
  doc.text(p.title, 10, 10)
  const lines = doc.splitTextToSize(p.question, 180)
  doc.text(lines, 10, 20)
  let y=40
  p.roundData.forEach(r=>{
    const t = `Round ${r.round} GPT: ${(r.gptView||'').slice(0,200)}`
    doc.text(doc.splitTextToSize(t,180),10,y); y+=20
    if(y>270){ doc.addPage(); y=10 }
  })
  doc.save(`${p.title}.pdf`)
}
export async function exportDOCX(p: Project){
  const { Document, Packer, Paragraph, TextRun } = await import('docx')
  const doc = new Document({
    sections: [{ children: [
      new Paragraph({ children: [new TextRun({ text: p.title, bold: true, size: 28 })]}),
      new Paragraph({ children: [new TextRun(p.question)]}),
      ...p.roundData.map(r=> new Paragraph({ children: [new TextRun(`第${r.round}回合 - GPT: ${r.gptView||''} / Meta: ${r.metaView||''}`)]}))
    ]}]
  })
  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${p.title}.docx`)
}
export async function exportZIP(p: Project){
  const zip = new JSZip()
  zip.file('project.json', JSON.stringify(p,null,2))
  zip.file('README.md', `# ${p.title}\n${p.question}`)
  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `${p.title}-${p.id}.zip`)
}
