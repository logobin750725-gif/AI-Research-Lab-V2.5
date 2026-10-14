
import Dexie, { Table } from 'dexie'

export interface Project {
  id: string
  title: string
  question: string
  inputs: InputAttachment[]
  participants: { a: 'GPT', b: 'Meta AI', c?: 'Gemini' }
  connectionMode: 'CONNECTED' | 'MANUAL'
  judgeMode: 'rotate_per_round' | 'rotate_per_topic' | 'three_judges' | 'none' | 'single_ai_three_roles'
  rounds: number
  roundData: RoundData[]
  evidences: Evidence[]
  verdict?: Verdict
  unresolved: string[]
  status: 'draft' | 'running' | 'debating' | 'judging' | 'completed' | 'blocked'
  createdAt: number
  updatedAt: number
}

export interface InputAttachment {
  id: string
  type: string
  name: string
  size?: number
  dataUrl?: string
  parsedText?: string
  url?: string
  createdAt: number
}

export interface RoundData {
  round: number
  gptView?: string
  metaView?: string
  gptRebuttal?: string
  metaRebuttal?: string
  judgeId?: string
  judgeOpinion?: string
  raw: { gpt?: string, meta?: string, gemini?: string }
  createdAt: number
}

export interface Evidence {
  id: string
  sourceUrl?: string
  sourceName: string
  obtainedAt: number
  claim: string
  summary: string
  verified: 'verified' | 'unverified' | 'conflict'
  conflict?: string
  confidence: number
  reason: string
}

export interface Verdict {
  result: 'SUPPORT_A' | 'SUPPORT_B' | 'BOTH_PARTIAL' | 'INSUFFICIENT' | 'UNDECIDABLE'
  judge: string
  reasoning: string
  evidenceIds: string[]
  createdAt: number
}

export interface AIProviderStatus {
  provider: 'GPT' | 'MetaAI' | 'Gemini'
  modelId: string
  connected: boolean
  mode: 'CONNECTED' | 'MANUAL'
  lastChecked: number
  lastError?: string
}

class AILabDB extends Dexie {
  projects!: Table<Project>
  providerStatus!: Table<AIProviderStatus>
  constructor(){
    super('AILabV2_5')
    this.version(2).stores({
      projects: 'id, title, status, createdAt, updatedAt',
      providerStatus: 'provider'
    })
  }
}
export const db = new AILabDB()
export function genId(){ return Math.random().toString(36).slice(2,10)+Date.now().toString(36) }
