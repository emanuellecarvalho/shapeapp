'use client'
import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Dumbbell, Droplets, Utensils } from 'lucide-react'
import { SEMANA, FICHA_TREINO, META_HIDRATACAO_ML } from '@/lib/dados'
import { supabase } from '@/lib/supabase'

interface DayData {
  hidratacao: { ml_total: number } | null
  refeicoes: number
  proteina: number
  treino: { treino_tipo: string; duracao_min: number } | null
}

const diasMap = [6, 0, 1, 2, 3, 4, 5]

function getIdxFromDate(dateStr: string): number {
  const d = new Date(dateStr + 'T12:00:00')
  return diasMap[d.getDay()]
}

export default function DiaPage({ params }: { params: Promise<{ data: string }> }) {
  const { data: dataParam } = use(params)
  const router = useRouter()

  const idx = getIdxFromDate(dataParam)
  const dia = SEMANA[idx]
  const treinoDia = dia.treino ? FICHA_TREINO[dia.treino] : null
  const corDia = treinoDia ? treinoDia.cor : dia.tipo === 'pilates' ? '#EF9F27' : '#444'

  const hoje = new Date().toISOString().split('T')[0]
  const isFuturo = dataParam > hoje
  const isHoje = dataParam === hoje

  const dataFormatada = new Date(dataParam + 'T12:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  const [dayData, setDayData] = useState<DayData | null>(null)
  const [loading, setLoading] = useState(!isFuturo)

  useEffect(() => {
    if (isFuturo) return
    const fetch = async () => {
      const [{ data: hid }, { data: ali }, { data: tre }] = await Promise.all([
        supabase.from('hidratacao_log').select('ml_total').eq('user_id', 'manu').eq('data', dataParam).maybeSingle(),
        supabase.from('alimentacao_log').select('proteina_g').eq('user_id', 'manu').eq('data', dataParam),
        supabase.from('treinos_log').select('treino_tipo, duracao_min').eq('user_id', 'manu').eq('data', dataParam).maybeSingle(),
      ])
      const proteina = ((ali as any[]) ?? []).reduce((sum: number, r: any) => sum + (r.proteina_g || 0), 0)
      setDayData({
        hidratacao: hid as any,
        refeicoes: ((ali as any[]) ?? []).length,
        proteina,
        treino: tre as any,
      })
      setLoading(false)
    }
    fetch()
  }, [dataParam, isFuturo])

  const hidPct = dayData?.hidratacao
    ? Math.min((dayData.hidratacao.ml_total / META_HIDRATACAO_ML) * 100, 100)
    : 0

  return (
    <div className="px-4 pt-6 pb-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()}
          className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
          <ChevronLeft size={18} className="text-white/70" />
        </button>
        <div>
          <p className="text-white/40 text-xs capitalize">{dataFormatada}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-2 h-2 rounded-full" style={{ background: corDia }} />
            <h1 className="font-semibold text-base">
              {treinoDia
                ? `Treino ${dia.treino} — ${treinoDia.nome}`
                : dia.tipo === 'pilates' ? 'Pilates' : 'Descanso'}
            </h1>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
        </div>
      ) : isFuturo ? (
        <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/5 text-center">
          {treinoDia ? (
            <>
              <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: corDia + '22' }}>
                <Dumbbell size={22} style={{ color: corDia }} />
              </div>
              <p className="font-medium mb-1">Treino {dia.treino}</p>
              <p className="text-white/40 text-sm">{treinoDia.exercicios.length} exercícios · ~{treinoDia.duracao} min</p>
            </>
          ) : (
            <>
              <span className="text-4xl">{dia.tipo === 'pilates' ? '🧘' : '😴'}</span>
              <p className="font-medium mt-3 capitalize">{dia.tipo}</p>
              <p className="text-white/40 text-sm mt-1">
                {dia.tipo === 'pilates' ? '6h–7h · foco em core' : 'Recuperação ativa'}
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3">

          {/* Treino */}
          {treinoDia && (
            <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: corDia + '22' }}>
                    <Dumbbell size={18} style={{ color: corDia }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Treino {dia.treino}</p>
                    <p className="text-white/40 text-xs">{treinoDia.exercicios.length} exercícios · ~{treinoDia.duracao} min</p>
                  </div>
                </div>
                {dayData?.treino ? (
                  <span className="text-xs font-medium text-[#1D9E75] bg-[#1D9E75]/10 px-3 py-1 rounded-full">
                    Concluído
                  </span>
                ) : (
                  <span className="text-xs text-white/30 bg-white/5 px-3 py-1 rounded-full">
                    {isHoje ? 'Pendente' : 'Não registrado'}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Pilates sem treino de academia */}
          {dia.tipo === 'pilates' && !treinoDia && (
            <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EF9F27]/10 flex items-center justify-center">
                  <span className="text-lg">🧘</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Pilates</p>
                  <p className="text-white/40 text-xs">6h–7h · foco em core</p>
                </div>
              </div>
            </div>
          )}

          {/* Hidratação */}
          <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Droplets size={16} className="text-[#378ADD]" />
                <p className="font-medium text-sm">Hidratação</p>
              </div>
              <p className="text-sm font-medium text-[#378ADD]">
                {dayData?.hidratacao
                  ? `${(dayData.hidratacao.ml_total / 1000).toFixed(2)}L`
                  : '—'}
                <span className="text-white/30 font-normal"> / {(META_HIDRATACAO_ML / 1000).toFixed(1)}L</span>
              </p>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#378ADD] rounded-full transition-all duration-700"
                style={{ width: `${hidPct}%` }} />
            </div>
            <p className="text-white/30 text-xs mt-2">{Math.round(hidPct)}% da meta diária</p>
          </div>

          {/* Alimentação */}
          <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Utensils size={16} className="text-[#1D9E75]" />
              <p className="font-medium text-sm">Alimentação</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-xl font-semibold">
                  {dayData?.refeicoes ?? 0}
                  <span className="text-white/30 text-sm font-normal">/5</span>
                </p>
                <p className="text-white/40 text-xs mt-0.5">refeições</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-xl font-semibold text-[#1D9E75]">
                  {Math.round(dayData?.proteina ?? 0)}
                  <span className="text-white/30 text-sm font-normal">g</span>
                </p>
                <p className="text-white/40 text-xs mt-0.5">proteína</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-xl font-semibold">
                  {Math.round(((dayData?.proteina ?? 0) / 130) * 100)}
                  <span className="text-white/30 text-sm font-normal">%</span>
                </p>
                <p className="text-white/40 text-xs mt-0.5">da meta</p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
