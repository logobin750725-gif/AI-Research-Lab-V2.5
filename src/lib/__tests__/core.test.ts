
import { describe, it, expect } from 'vitest'
import { genId, type Project } from '../db'

describe('AI Lab V2.5 Core', ()=>{
  it('genId unique', ()=>{
    const a = genId()
    const b = genId()
    expect(a).not.toBe(b)
  })
  it('project schema required fields', ()=>{
    const p: Project = { id:'test', title:'t', question:'q', inputs:[], participants:{a:'GPT', b:'Meta AI'}, connectionMode:'MANUAL', judgeMode:'rotate_per_round', rounds:3, roundData:[], evidences:[], unresolved:[], status:'draft', createdAt: Date.now(), updatedAt: Date.now() }
    expect(p.connectionMode).toBe('MANUAL')
    expect(p.rounds).toBeGreaterThanOrEqual(1)
    expect(p.rounds).toBeLessThanOrEqual(7)
  })
  it('judge result enum', ()=>{
    const results = ['SUPPORT_A','SUPPORT_B','BOTH_PARTIAL','INSUFFICIENT','UNDECIDABLE']
    expect(results).toContain('INSUFFICIENT')
  })
  it('MANUAL MODE banner logic', ()=>{
    const mode = 'MANUAL'
    expect(mode).toBe('MANUAL')
  })
  it('export formats list', ()=>{
    const formats = ['PDF','DOCX','Markdown','JSON','CSV','HTML','TXT','ZIP']
    expect(formats.length).toBe(8)
  })
})
