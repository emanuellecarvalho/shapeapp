'use client'
import { useState } from 'react'
import { FICHA_TREINO, SEMANA } from '@/lib/dados'
import { User, Dumbbell, Apple, Moon, Activity, ChevronRight } from 'lucide-react'

const PERFIL = {
  nome: 'Manu',
  peso: '54,4 kg',
  altura: '1,59 m',
  objetivo: 'Hipertrofia — Glúteos + Corpo atlético',
  nivel: 'Iniciante / Intermediária',
  condicao: "Hérnia lombar (todas as L's)",
}

const PILARES = [
  {
    icon: Dumbbell,
    label: 'Treino',
    cor: '#c8503a',
    itens: [
      'Musculação 4–5×/semana',
      'Pilates 2×/semana',
      'Divisão ABCD — lombar-segura',
      'Sem cardio',
    ],
  },
  {
    icon: Apple,
    label: 'Alimentação',
    cor: '#3a7a50',
    itens: [
      'Batch cooking (almoço + jantar)',
      'Foco em proteína',
      'Sem contagem obsessiva',
    ],
  },
  {
    icon: Moon,
    label: 'Sono & Recovery',
    cor: '#7F77DD',
    itens: [
      'Sono como variável de performance',
      'Recovery integrado ao treino',
      'Pilates como mobilidade ativa',
    ],
  },
  {
    icon: Activity,
    label: 'Marcadores',
    cor: '#c07830',
    itens: [
      'Peso + medidas mensais',
      'Fotos de progresso',
      'Exames semestrais',
      'Ferro, vitamina D, TSH',
    ],
  },
]

export default function PerfilPage() {
  const [expandido, setExpandido] = useState<number | null>(null)

  const totalTreinos = SEMANA.filter(d => d.tipo === 'treino').length
  const totalPilates = SEMANA.filter(d => d.tipo === 'pilates').length

  return (
    <div className="px-4 pt-8 pb-24">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#7F77DD]/20 flex items-center justify-center">
          <User size={22} className="text-[#7F77DD]" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">{PERFIL.nome}</h1>
          <p className="text-white/40 text-xs mt-0.5">{PERFIL.objetivo}</p>
        </div>
      </div>

      {/* Stats rápidos */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="bg-[#1a1a1a] rounded-2xl p-3 border border-white/5 text-center">
          <p className="text-lg font-semibold text-white">{PERFIL.peso}</p>
          <p className="text-white/30 text-[10px] uppercase tracking-wider mt-0.5">Peso</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-3 border border-white/5 text-center">
          <p className="text-lg font-semibold text-white">{PERFIL.altura}</p>
          <p className="text-white/30 text-[10px] uppercase tracking-wider mt-0.5">Altura</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-3 border border-white/5 text-center">
          <p className="text-lg font-semibold text-white">{totalTreinos}+{totalPilates}</p>
          <p className="text-white/30 text-[10px] uppercase tracking-wider mt-0.5">Treinos/sem</p>
        </div>
      </div>

      {/* Semana visual */}
      <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 mb-5">
        <p className="text-white/30 text-xs font-medium uppercase tracking-wider mb-3">Divisão semanal</p>
        <div className="grid grid-cols-7 gap-1">
          {SEMANA.map((dia, i) => {
            const corMap: Record<string, string> = {
              treino: FICHA_TREINO[dia.treino as keyof typeof FICHA_TREINO]?.cor ?? '#444',
              pilates: '#6450a0',
              descanso: '#2a2a2a',
            }
            const cor = corMap[dia.tipo ?? 'descanso'] ?? '#2a2a2a'
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-white/20 uppercase">{dia.label}</span>
                <div
                  className="w-full rounded-lg py-2 flex items-center justify-center"
                  style={{ background: `${cor}22`, border: `1px solid ${cor}44` }}
                >
                  <span className="text-[9px] font-bold" style={{ color: cor }}>
                    {dia.tipo === 'treino' ? dia.treino : dia.tipo === 'pilates' ? 'P' : '—'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Condição especial */}
      <div className="flex items-start gap-2 bg-amber-500/8 border border-amber-500/15 rounded-2xl px-4 py-3 mb-5">
        <span className="text-amber-400 text-sm mt-0.5">⚠</span>
        <div>
          <p className="text-amber-400 text-xs font-medium mb-0.5">Condição monitorada</p>
          <p className="text-amber-400/70 text-xs leading-relaxed">{PERFIL.condicao} — protocolo lombar-seguro ativo em todos os treinos.</p>
        </div>
      </div>

      {/* Pilares */}
      <p className="text-white/30 text-xs font-medium uppercase tracking-wider mb-3">Pilares do protocolo</p>
      <div className="space-y-2">
        {PILARES.map((pilar, i) => {
          const Icon = pilar.icon
          const open = expandido === i
          return (
            <div key={i} className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4"
                onClick={() => setExpandido(open ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${pilar.cor}20` }}>
                    <Icon size={16} style={{ color: pilar.cor }} />
                  </div>
                  <span className="text-sm font-medium">{pilar.label}</span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-white/20 transition-transform"
                  style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
                />
              </button>
              {open && (
                <div className="px-4 pb-4 border-t border-white/5">
                  <ul className="mt-3 space-y-2">
                    {pilar.itens.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/50">
                        <span style={{ color: pilar.cor }} className="mt-0.5 text-xs">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Filosofia */}
      <div className="mt-5 bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
        <p className="text-white/30 text-xs font-medium uppercase tracking-wider mb-2">Filosofia</p>
        <p className="text-white/50 text-sm leading-relaxed italic">
          "Sustentável &gt; perfeito. Longo prazo &gt; resultado rápido."
        </p>
      </div>

    </div>
  )
}