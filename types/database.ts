export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface TreinoLogRow {
  id: string
  user_id: string
  data: string
  treino_tipo: string
  exercicios: Json
  duracao_min: number
  observacoes?: string | null
  created_at: string
}

export interface AlimentacaoLogRow {
  id: string
  user_id: string
  data: string
  refeicao: string
  itens: Json
  proteina_g: number
  carb_g: number
  gordura_g: number
  created_at: string
}

export interface HidratacaoLogRow {
  id: string
  user_id: string
  data: string
  ml_total: number
  registros: Json
  created_at: string
}

export interface MedidasLogRow {
  id: string
  user_id: string
  data: string
  peso_kg?: number | null
  gordura_pct?: number | null
  cintura_cm?: number | null
  quadril_cm?: number | null
  observacoes?: string | null
  created_at: string
}

export type Refeicao = 'cafe_manha' | 'lanche_manha' | 'almoco' | 'lanche_tarde' | 'jantar'

export interface ExercicioLog {
  nome: string
  series: SerieLog[]
}

export interface SerieLog {
  numero: number
  reps: number
  carga_kg: number
  executado: boolean
}

export interface Database {
  public: {
    Tables: {
      treinos_log: {
        Row: TreinoLogRow
        Insert: Omit<TreinoLogRow, 'id' | 'created_at'>
        Update: Partial<Omit<TreinoLogRow, 'id' | 'created_at'>>
      }
      alimentacao_log: {
        Row: AlimentacaoLogRow
        Insert: Omit<AlimentacaoLogRow, 'id' | 'created_at'>
        Update: Partial<Omit<AlimentacaoLogRow, 'id' | 'created_at'>>
      }
      hidratacao_log: {
        Row: HidratacaoLogRow
        Insert: Omit<HidratacaoLogRow, 'id' | 'created_at'>
        Update: Partial<Omit<HidratacaoLogRow, 'id' | 'created_at'>>
      }
      medidas_log: {
        Row: MedidasLogRow
        Insert: Omit<MedidasLogRow, 'id' | 'created_at'>
        Update: Partial<Omit<MedidasLogRow, 'id' | 'created_at'>>
      }
    }
  }
}
