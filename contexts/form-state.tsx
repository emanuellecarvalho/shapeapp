'use client'
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import type { Refeicao } from '@/types/database'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MacroForm {
  proteina: number
  carb: number
  gordura: number
  obs: string
}

export interface SerieState {
  reps: number
  carga: number
  feito: boolean
}

interface AlimentacaoState {
  date: string
  data: Partial<Record<Refeicao, MacroForm>>
}

interface TreinoState {
  date: string
  treinoKey: string
  cargas: Record<string, Record<number, SerieState>>
}

interface State {
  alimentacao: AlimentacaoState
  treino: TreinoState
}

// ─── Actions ─────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_ALIMENTACAO_FIELD'; refeicao: Refeicao; campo: keyof MacroForm; value: string | number }
  | { type: 'SET_TREINO_CARGA'; exNome: string; serie: number; campo: keyof SerieState; value: number | boolean }
  | { type: 'SET_TREINO_KEY'; treinoKey: string; date: string }
  | { type: 'HYDRATE'; state: State }

// ─── Initial state ────────────────────────────────────────────────────────────

const today = () => new Date().toISOString().split('T')[0]

const INITIAL_STATE: State = {
  alimentacao: { date: today(), data: {} },
  treino: { date: today(), treinoKey: 'A', cargas: {} },
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HYDRATE':
      return action.state

    case 'SET_ALIMENTACAO_FIELD': {
      const current = state.alimentacao.data[action.refeicao] ?? {
        proteina: 0, carb: 0, gordura: 0, obs: '',
      }
      return {
        ...state,
        alimentacao: {
          date: today(),
          data: {
            ...state.alimentacao.data,
            [action.refeicao]: { ...current, [action.campo]: action.value },
          },
        },
      }
    }

    case 'SET_TREINO_CARGA': {
      const exPrev = state.treino.cargas[action.exNome] ?? {}
      const seriePrev = exPrev[action.serie] ?? { reps: 0, carga: 0, feito: false }
      return {
        ...state,
        treino: {
          ...state.treino,
          cargas: {
            ...state.treino.cargas,
            [action.exNome]: {
              ...exPrev,
              [action.serie]: { ...seriePrev, [action.campo]: action.value },
            },
          },
        },
      }
    }

    case 'SET_TREINO_KEY':
      // Clear cargas only when treino type or date changes
      if (state.treino.treinoKey === action.treinoKey && state.treino.date === action.date) {
        return state
      }
      return {
        ...state,
        treino: { date: action.date, treinoKey: action.treinoKey, cargas: {} },
      }

    default:
      return state
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface FormStateContextValue {
  alimentacaoForm: AlimentacaoState['data']
  treinoCargas: TreinoState['cargas']
  treinoKey: string
  setAlimentacaoField: (refeicao: Refeicao, campo: keyof MacroForm, value: string | number) => void
  setTreinoCarga: (exNome: string, serie: number, campo: keyof SerieState, value: number | boolean) => void
  setTreinoKey: (key: string) => void
}

const FormStateContext = createContext<FormStateContextValue | null>(null)

const STORAGE_KEY = 'shapeapp_form_state'

// ─── Provider ────────────────────────────────────────────────────────────────

export function FormStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  // Hydrate from localStorage on mount, clearing stale data
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const saved: State = JSON.parse(raw)
      const t = today()
      const hydrated: State = {
        alimentacao: saved.alimentacao?.date === t
          ? saved.alimentacao
          : { date: t, data: {} },
        treino: saved.treino?.date === t
          ? saved.treino
          : { date: t, treinoKey: saved.treino?.treinoKey ?? 'A', cargas: {} },
      }
      dispatch({ type: 'HYDRATE', state: hydrated })
    } catch {
      // corrupted storage — reset silently
    }
  }, [])

  // Persist to localStorage on every state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const setAlimentacaoField = useCallback(
    (refeicao: Refeicao, campo: keyof MacroForm, value: string | number) =>
      dispatch({ type: 'SET_ALIMENTACAO_FIELD', refeicao, campo, value }),
    []
  )

  const setTreinoCarga = useCallback(
    (exNome: string, serie: number, campo: keyof SerieState, value: number | boolean) =>
      dispatch({ type: 'SET_TREINO_CARGA', exNome, serie, campo, value }),
    []
  )

  const setTreinoKey = useCallback(
    (treinoKey: string) => dispatch({ type: 'SET_TREINO_KEY', treinoKey, date: today() }),
    []
  )

  return (
    <FormStateContext.Provider value={{
      alimentacaoForm: state.alimentacao.data,
      treinoCargas: state.treino.cargas,
      treinoKey: state.treino.treinoKey,
      setAlimentacaoField,
      setTreinoCarga,
      setTreinoKey,
    }}>
      {children}
    </FormStateContext.Provider>
  )
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useFormState() {
  const ctx = useContext(FormStateContext)
  if (!ctx) throw new Error('useFormState must be used inside FormStateProvider')
  return ctx
}
