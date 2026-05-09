'use client'
import { useState, useEffect, useRef } from 'react'
import { FICHA_TREINO, SEMANA, type TreinoKey } from '@/lib/dados'
import { supabase } from '@/lib/supabase'
import { ChevronDown, ChevronUp, Check, Timer, Save, AlertTriangle, ShieldCheck } from 'lucide-react'

// ─── SVG Diagrama Muscular Feminino — estilo anatômico ───────────────────────

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface SerieState { reps: number; carga: number; feito: boolean }
type CargasMap = Record<string, Record<number, SerieState>>

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TreinoPage() {
  const hoje = new Date()
  const diasMap = [6, 0, 1, 2, 3, 4, 5]
  const idxHoje = diasMap[hoje.getDay()]
  const diaHoje = SEMANA[idxHoje]

  const [treinoSelecionado, setTreinoSelecionado] = useState<TreinoKey>(
    (diaHoje.treino as TreinoKey) || 'A'
  )
  const treino = FICHA_TREINO[treinoSelecionado]
  const [expandido, setExpandido] = useState<number | null>(0)
  const [cargas, setCargas] = useState<CargasMap>({})
  const [timer, setTimer] = useState<number | null>(null)
  const [timerAtivo, setTimerAtivo] = useState(false)
  const [savedMsg, setSavedMsg] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timerAtivo && timer !== null && timer > 0) {
      intervalRef.current = setInterval(() => setTimer(t => (t ?? 0) - 1), 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timer === 0) setTimerAtivo(false)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [timerAtivo, timer])

  const iniciarTimer = (seg: number) => { setTimer(seg); setTimerAtivo(true) }

  const setCarga = (
    exNome: string,
    serie: number,
    campo: keyof SerieState,
    valor: number | boolean
  ) => {
    setCargas(prev => ({
      ...prev,
      [exNome]: {
        ...(prev[exNome] || {}),
        [serie]: {
          reps: prev[exNome]?.[serie]?.reps ?? 0,
          carga: prev[exNome]?.[serie]?.carga ?? 0,
          feito: prev[exNome]?.[serie]?.feito ?? false,
          [campo]: valor,
        },
      },
    }))
    if (campo === 'feito' && valor === true) {
      const ex = treino.exercicios.find(e => e.nome === exNome)
      if (ex) iniciarTimer(ex.descanso)
    }
  }

  const salvarTreino = async () => {
    const exerciciosLog = treino.exercicios.map(ex => ({
      nome: ex.nome,
      series: Array.from({ length: ex.series }, (_, i) => ({
        numero: i + 1,
        reps: cargas[ex.nome]?.[i]?.reps || ex.reps,
        carga_kg: cargas[ex.nome]?.[i]?.carga || 0,
        executado: cargas[ex.nome]?.[i]?.feito || false,
      })),
    }))
    await supabase.from('treinos_log').insert({
      user_id: 'manu',
      data: hoje.toISOString().split('T')[0],
      treino_tipo: treinoSelecionado,
      exercicios: exerciciosLog,
      duracao_min: treino.duracao,
    } as any)
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 2500)
  }

  const keys: TreinoKey[] = ['A', 'B', 'C', 'D']

  return (
    <div className="px-4 pt-8 pb-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold">Ficha de Treino</h1>
        {timer !== null && (
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              timerAtivo ? 'bg-[#7F77DD]/20 text-[#7F77DD]' : 'bg-white/10 text-white/40'
            }`}
          >
            <Timer size={14} />
            {String(Math.floor((timer || 0) / 60)).padStart(2, '0')}:
            {String((timer || 0) % 60).padStart(2, '0')}
          </div>
        )}
      </div>

      {/* Tabs de treino */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {keys.map(k => (
          <button
            key={k}
            onClick={() => { setTreinoSelecionado(k); setExpandido(0); setCargas({}) }}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium border transition-all"
            style={
              treinoSelecionado === k
                ? { background: FICHA_TREINO[k].cor, borderColor: FICHA_TREINO[k].cor, color: '#fff' }
                : { background: 'transparent', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }
            }
          >
            Treino {k}
          </button>
        ))}
      </div>

      {/* Info do treino */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 mb-4">
        <p className="font-semibold" style={{ color: treino.cor }}>{treino.nome}</p>
        <p className="text-white/40 text-xs mt-0.5">{treino.dia} · ~{treino.duracao} min</p>
        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-white/30 text-xs font-medium uppercase tracking-wider mb-1">Aquecimento</p>
          <p className="text-white/50 text-xs leading-relaxed">{treino.aquecimento}</p>
        </div>
      </div>

      {/* Lista de exercícios */}
      <div className="space-y-2 mb-5">
        {treino.exercicios.map((ex, idx) => {
          const open = expandido === idx
          const seriesFeitas = Object.values(cargas[ex.nome] || {}).filter(s => s.feito).length

          return (
            <div
              key={idx}
              className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden"
            >
              {/* Cabeçalho do exercício */}
              <button
                className="w-full flex items-center justify-between p-4"
                onClick={() => setExpandido(open ? null : idx)}
              >
                <div className="flex items-center gap-3 text-left min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/40 flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium truncate">{ex.nome}</p>
                      {ex.prioridade && (
                        <span
                          className="flex-shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                          style={{ background: `${treino.cor}25`, color: treino.cor }}
                        >
                          ★
                        </span>
                      )}
                    </div>
                    <p className="text-white/40 text-xs">
                      {ex.series}×{ex.reps} · {ex.descanso}s · {seriesFeitas}/{ex.series} ✓
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-2">
                  {open
                    ? <ChevronUp size={16} className="text-white/30" />
                    : <ChevronDown size={16} className="text-white/30" />
                  }
                </div>
              </button>

              {/* Conteúdo expandido */}
              {open && (
                <div className="px-4 pb-4 border-t border-white/5">


                  {/* GIF execução */}
                  <div className="mt-3 mb-3">
                    <p className="text-[9px] text-white/20 uppercase tracking-widest mb-1">Execução</p>
                    <div className="rounded-xl overflow-hidden bg-[#111] flex items-center justify-center" style={{ height: 180 }}>
                      <img
                        src={ex.imagemUrl}
                        alt={ex.nome}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  </div>


                  {/* Alerta lombar */}
                  {ex.alerta === 'caution' && (
                    <div className="flex items-start gap-2 bg-amber-500/8 border border-amber-500/15 rounded-xl px-3 py-2 mb-3">
                      <AlertTriangle size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-amber-400/80 text-[10px] leading-relaxed">
                        Atenção lombar — inicia leve, monitora a forma antes de progredir carga.
                      </p>
                    </div>
                  )}
                  {ex.alerta === 'safe' && (
                    <div className="flex items-start gap-2 bg-emerald-500/8 border border-emerald-500/15 rounded-xl px-3 py-2 mb-3">
                      <ShieldCheck size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="text-emerald-400/80 text-[10px] leading-relaxed">
                        Lombar-seguro — movimento controlado mantém a coluna protegida.
                      </p>
                    </div>
                  )}

                  {/* Dica de execução */}
                  <p className="text-white/40 text-xs mb-3 italic leading-relaxed">{ex.foco}</p>

                  {/* Séries */}
                  <div className="space-y-2">
                    {Array.from({ length: ex.series }, (_, i) => {
                      const s = cargas[ex.nome]?.[i]
                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-2 p-2.5 rounded-xl transition-colors ${
                            s?.feito ? 'bg-[#1D9E75]/10' : 'bg-white/[0.03]'
                          }`}
                        >
                          <span className="text-white/30 text-xs w-14 flex-shrink-0">Série {i + 1}</span>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              placeholder={String(ex.reps)}
                              inputMode="numeric"
                              className="w-14 bg-white/5 rounded-lg px-2 py-1.5 text-sm text-center border border-white/10 focus:outline-none focus:border-[#7F77DD]"
                              value={s?.reps || ''}
                              onChange={e => setCarga(ex.nome, i, 'reps', Number(e.target.value))}
                            />
                            <span className="text-white/20 text-xs">rep</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              placeholder="0"
                              step="0.5"
                              inputMode="decimal"
                              className="w-16 bg-white/5 rounded-lg px-2 py-1.5 text-sm text-center border border-white/10 focus:outline-none focus:border-[#7F77DD]"
                              value={s?.carga || ''}
                              onChange={e => setCarga(ex.nome, i, 'carga', Number(e.target.value))}
                            />
                            <span className="text-white/20 text-xs">kg</span>
                          </div>
                          <button
                            onClick={() => setCarga(ex.nome, i, 'feito', !s?.feito)}
                            className={`ml-auto w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                              s?.feito ? 'bg-[#1D9E75]' : 'bg-white/10'
                            }`}
                          >
                            <Check size={14} className={s?.feito ? 'text-white' : 'text-white/30'} />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Botão salvar */}
      <button
        onClick={salvarTreino}
        className={`w-full py-3.5 rounded-2xl font-medium flex items-center justify-center gap-2 transition-colors ${
          savedMsg ? 'bg-[#1D9E75]' : 'bg-[#7F77DD]'
        }`}
      >
        {savedMsg
          ? <><Check size={18} /> Treino salvo!</>
          : <><Save size={18} /> Salvar treino</>
        }
      </button>
    </div>
  )
}