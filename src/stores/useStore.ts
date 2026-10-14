
import { create } from 'zustand'
import { Project, AIProviderStatus, db, genId } from '../lib/db'

type State = {
  projects: Project[]
  currentId: string | null
  providerStatus: AIProviderStatus[]
  load: ()=>Promise<void>
  createProject: (title:string, question:string)=>Promise<string>
  updateProject: (id:string, patch: Partial<Project>)=>Promise<void>
  deleteProject: (id:string)=>Promise<void>
}

export const useStore = create<State>((set)=>({
  projects: [],
  currentId: null,
  providerStatus: [
    { provider: 'GPT', modelId: 'gpt-4o', connected: false, mode: 'MANUAL', lastChecked: Date.now(), lastError: '未配置合法 API Key，需手動模式' },
    { provider: 'MetaAI', modelId: 'meta-ai-consumer', connected: false, mode: 'MANUAL', lastChecked: Date.now(), lastError: 'Meta AI 消費者服務無官方自動化 API，需手動模式' },
    { provider: 'Gemini', modelId: 'gemini-1.5-pro', connected: false, mode: 'MANUAL', lastChecked: Date.now(), lastError: '未驗證連線，需手動或配置 API' },
  ],
  load: async ()=>{
    const projects = await db.projects.orderBy('updatedAt').reverse().toArray()
    set({ projects })
  },
  createProject: async (title, question)=>{
    const id = genId()
    const now = Date.now()
    const p: Project = {
      id, title: title || '未命名研究', question,
      inputs: [], participants: { a: 'GPT', b: 'Meta AI' },
      connectionMode: 'MANUAL', judgeMode: 'rotate_per_round', rounds: 3,
      roundData: [], evidences: [], unresolved: [], status: 'draft', createdAt: now, updatedAt: now
    }
    await db.projects.add(p)
    const projects = await db.projects.orderBy('updatedAt').reverse().toArray()
    set({ projects, currentId: id })
    return id
  },
  updateProject: async (id, patch)=>{
    await db.projects.update(id, { ...patch, updatedAt: Date.now() })
    const projects = await db.projects.orderBy('updatedAt').reverse().toArray()
    set({ projects })
  },
  deleteProject: async (id)=>{
    await db.projects.delete(id)
    const projects = await db.projects.orderBy('updatedAt').reverse().toArray()
    set({ projects })
  }
}))
