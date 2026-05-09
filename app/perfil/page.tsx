'use client'
import { useState, useEffect, useRef } from 'react'
import { FICHA_TREINO, SEMANA, type TreinoKey } from '@/lib/dados'
import { supabase } from '@/lib/supabase'
import { ChevronDown, ChevronUp, Check, Timer, Save, AlertTriangle, ShieldCheck } from 'lucide-react'

// ─── SVG Diagrama Muscular Feminino ──────────────────────────────────────────
// Silhueta feminina de costas + frente com grupos musculares destacáveis
function MuscleDiagram({ musculo }: { musculo: MuscleKey }) {
  // Cores: ativo = rosa/vermelho vibrante, inativo = branco com baixa opacidade
  const ativo = '#e05a3a'
  const inativo = 'rgba(255,255,255,0.08)'
  const stroke = 'rgba(255,255,255,0.15)'

  // Quais grupos ficam na frente vs atrás
  const isFront = ['quadriceps', 'adutora', 'biceps', 'ombro', 'triceps', 'core'].includes(musculo)

  const c = (group: MuscleKey) => musculo === group ? ativo : inativo

  return (
    <div className="flex gap-3 items-end justify-center py-1">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[9px] text-white/20 uppercase tracking-widest">Frente</span>
        <svg width="72" height="140" viewBox="0 0 72 140" fill="none">
          <ellipse cx="36" cy="10" rx="9" ry="10" fill="rgba(255,255,255,0.12)" stroke={stroke} strokeWidth="0.5" />
          <rect x="31" y="19" width="10" height="7" rx="2" fill="rgba(255,255,255,0.08)" />
          <ellipse cx="18" cy="32" rx="9" ry="6" fill={c('ombro')} stroke={stroke} strokeWidth="0.5" />
          <ellipse cx="54" cy="32" rx="9" ry="6" fill={c('ombro')} stroke={stroke} strokeWidth="0.5" />
          <path d="M24 26 Q36 24 48 26 L50 60 Q36 63 22 60 Z" fill={c('core')} stroke={stroke} strokeWidth="0.5" />
          <path d="M11 30 Q6 38 8 48 L14 46 Q13 38 17 31 Z" fill={c('biceps')} stroke={stroke} strokeWidth="0.5" />
          <path d="M61 30 Q66 38 64 48 L58 46 Q59 38 55 31 Z" fill={c('biceps')} stroke={stroke} strokeWidth="0.5" />
          <path d="M9 48 Q6 58 9 66 L14 63 Q12 55 13 47 Z" fill={c('triceps')} stroke={stroke} strokeWidth="0.5" />
          <path d="M63 48 Q66 58 63 66 L58 63 Q60 55 59 47 Z" fill={c('triceps')} stroke={stroke} strokeWidth="0.5" />
          <path d="M8 66 Q6 76 9 82 L13 80 Q11 73 13 65 Z" fill="rgba(255,255,255,0.07)" stroke={stroke} strokeWidth="0.5" />
          <path d="M64 66 Q66 76 63 82 L59 80 Q61 73 59 65 Z" fill="rgba(255,255,255,0.07)" stroke={stroke} strokeWidth="0.5" />
          <path d="M22 61 Q18 72 19 88 L28 88 Q28 72 29 62 Z" fill={c('quadriceps')} stroke={stroke} strokeWidth="0.5" />
          <path d="M50 61 Q54 72 53 88 L44 88 Q44 72 43 62 Z" fill={c('quadriceps')} stroke={stroke} strokeWidth="0.5" />
          <path d="M29 62 Q32 70 36 72 Q40 70 43 62 L36 65 Z" fill={c('adutora')} stroke={stroke} strokeWidth="0.5" />
          <ellipse cx="23" cy="92" rx="6" ry="5" fill="rgba(255,255,255,0.06)" stroke={stroke} strokeWidth="0.5" />
          <ellipse cx="49" cy="92" rx="6" ry="5" fill="rgba(255,255,255,0.06)" stroke={stroke} strokeWidth="0.5" />
          <path d="M19 96 Q17 110 19 122 L26 120 Q25 108 28 97 Z" fill={c('panturrilha')} stroke={stroke} strokeWidth="0.5" />
          <path d="M53 96 Q55 110 53 122 L46 120 Q47 108 44 97 Z" fill={c('panturrilha')} stroke={stroke} strokeWidth="0.5" />
          <ellipse cx="22" cy="128" rx="7" ry="4" fill="rgba(255,255,255,0.06)" stroke={stroke} strokeWidth="0.5" />
          <ellipse cx="50" cy="128" rx="7" ry="4" fill="rgba(255,255,255,0.06)" stroke={stroke} strokeWidth="0.5" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-[9px] text-white/20 uppercase tracking-widest">Costas</span>
        <svg width="72" height="140" viewBox="0 0 72 140" fill="none">
          <ellipse cx="36" cy="10" rx="9" ry="10" fill="rgba(255,255,255,0.12)" stroke={stroke} strokeWidth="0.5" />
          {/* Pescoço */}
          <rect x="31" y="19" width="10" height="7" rx="2" fill="rgba(255,255,255,0.08)" />
          {/* Ombros */}
          <ellipse cx="18" cy="32" rx="9" ry="6" fill={c('ombro')} stroke={stroke} strokeWidth="0.5" />
          <ellipse cx="54" cy="32" rx="9" ry="6" fill={c('ombro')} stroke={stroke} strokeWidth="0.5" />
          {/* Costas (trapézio + dorsal) */}
          <path d="M24 26 Q36 24 48 26 L50 58 Q36 61 22 58 Z" fill={c('costas')} stroke={stroke} strokeWidth="0.5" />
          {/* Lombar / core posterior */}
          <path d="M27 58 Q36 61 45 58 L44 70 Q36 72 28 70 Z" fill={c('core')} stroke={stroke} strokeWidth="0.5" />
          {/* Bíceps posterior (pouco visível) */}
          <path d="M11 30 Q6 38 8 48 L14 46 Q13 38 17 31 Z" fill={c('biceps')} stroke={stroke} strokeWidth="0.5" />
          <path d="M61 30 Q66 38 64 48 L58 46 Q59 38 55 31 Z" fill={c('biceps')} stroke={stroke} strokeWidth="0.5" />
          {/* Tríceps */}
          <path d="M9 47 Q6 57 9 66 L14 63 Q12 55 13 47 Z" fill={c('triceps')} stroke={stroke} strokeWidth="0.5" />
          <path d="M63 47 Q66 57 63 66 L58 63 Q60 55 59 47 Z" fill={c('triceps')} stroke={stroke} strokeWidth="0.5" />
          {/* Antebraços */}
          <path d="M8 66 Q6 76 9 82 L13 80 Q11 73 13 65 Z" fill="rgba(255,255,255,0.07)" stroke={stroke} strokeWidth="0.5" />
          <path d="M64 66 Q66 76 63 82 L59 80 Q61 73 59 65 Z" fill="rgba(255,255,255,0.07)" stroke={stroke} strokeWidth="0.5" />
          {/* Glúteo esquerdo */}
          <path d="M28 70 Q24 76 25 84 Q30 88 36 87 Q42 88 47 84 Q48 76 44 70 Q40 72 36 72 Q32 72 28 70 Z" fill={c('gluteo')} stroke={stroke} strokeWidth="0.5" />
          {/* Posterior de coxa esquerdo */}
          <path d="M25 84 Q21 96 22 106 L29 105 Q29 95 28 85 Z" fill={c('posterior')} stroke={stroke} strokeWidth="0.5" />
          {/* Posterior de coxa direito */}
          <path d="M47 84 Q51 96 50 106 L43 105 Q43 95 44 85 Z" fill={c('posterior')} stroke={stroke} strokeWidth="0.5" />
          {/* Adutora posterior */}
          <path d="M30 85 Q33 90 36 91 Q39 90 42 85 Q39 87 36 87 Q33 87 30 85 Z" fill={c('adutora')} stroke={stroke} strokeWidth="0.5" />
          {/* Joelhos */}
          <ellipse cx="25" cy="109" rx="6" ry="4" fill="rgba(255,255,255,0.06)" stroke={stroke} strokeWidth="0.5" />
          <ellipse cx="47" cy="109" rx="6" ry="4" fill="rgba(255,255,255,0.06)" stroke={stroke} strokeWidth="0.5" />
          {/* Panturrilha */}
          <path d="M21 112 Q18 122 21 130 L29 129 Q27 120 27 112 Z" fill={c('panturrilha')} stroke={stroke} strokeWidth="0.5" />
          <path d="M51 112 Q54 122 51 130 L43 129 Q45 120 45 112 Z" fill={c('panturrilha')} stroke={stroke} strokeWidth="0.5" />
          {/* Pés */}
          <ellipse cx="24" cy="134" rx="7" ry="4" fill="rgba(255,255,255,0.06)" stroke={stroke} strokeWidth="0.5" />
          <ellipse cx="48" cy="134" rx="7" ry="4" fill="rgba(255,255,255,0.06)" stroke={stroke} strokeWidth="0.5" />
        </svg>
      </div>

      {/* Label do músculo ativo */}
      <div className="flex flex-col items-start justify-end pb-2 gap-1">
        <div className="w-2 h-2 rounded-full" style={{ background: ativo }} />
        <span className="text-[10px] font-medium" style={{ color: ativo }}>
          {MUSCLE_LABELS[musculo]}
        </span>
      </div>
    </div>
  )
}

// ─── Imagem do exercício ──────────────────────────────────────────────────────
function ExercicioImagem({ url, nome }: { url: string; nome: string }) {
  const [erro, setErro] = useState(false)
  if (erro) return null
  return (
    <div className="rounded-xl overflow-hidden bg-white/5 mb-3" style={{ height: 160 }}>
      <img
        src={url}
        alt={nome}
        className="w-full h-full object-cover object-top"
        onError={() => setErro(true)}
      />
    </div>
  )
}

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

                  {/* Imagem GIF do exercício + Diagrama muscular */}
                  <div className="mt-3 grid grid-cols-2 gap-3 mb-3">

                    {/* GIF */}
                    <div className="flex flex-col gap-1">
                      <p className="text-[9px] text-white/20 uppercase tracking-widest">Execução</p>
                      <div className="rounded-xl overflow-hidden bg-white/5" style={{ height: 148 }}>
                        <img
                          src={ex.imagemUrl}
                          alt={ex.nome}
                          className="w-full h-full object-cover object-top"
                          onError={e => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* Diagrama muscular SVG */}
                    <div className="flex flex-col gap-1">
                      <p className="text-[9px] text-white/20 uppercase tracking-widest">Músculo</p>
                      <div className="bg-white/[0.03] rounded-xl flex items-center justify-center" style={{ height: 148 }}>
                        <MuscleDiagram musculo={ex.musculo} />
                      </div>
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