'use client'
import Link from 'next/link'
import { Dumbbell, Utensils, Droplets, TrendingUp, ChevronRight } from 'lucide-react'
import { SEMANA, FICHA_TREINO, META_HIDRATACAO_ML } from '@/lib/dados'

export default function Home() {
  const hoje = new Date()
  const diaSemana = hoje.getDay()
  const diasMap = [6, 0, 1, 2, 3, 4, 5]
  const idxHoje = diasMap[diaSemana]
  const diaHoje = SEMANA[idxHoje]
  const nomeDia = hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
  const treinoHoje = diaHoje.treino ? FICHA_TREINO[diaHoje.treino] : null

  return (
    <div className="px-4 pt-8 pb-4">
      <div className="mb-6">
        <p className="text-white/50 text-sm capitalize">{nomeDia}</p>
        <h1 className="text-2xl font-semibold mt-1">Bom dia! 👋</h1>
      </div>

      <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">Hoje</p>
      {treinoHoje ? (
        <Link href="/treino" className="block bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: treinoHoje.cor + '22' }}>
                <Dumbbell size={18} style={{ color: treinoHoje.cor }} />
              </div>
              <div>
                <p className="font-medium text-sm">Treino {diaHoje.treino} — {treinoHoje.nome}</p>
                <p className="text-white/40 text-xs">{treinoHoje.exercicios.length} exercícios · ~{treinoHoje.duracao} min</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-white/30" />
          </div>
        </Link>
      ) : (
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <span className="text-lg">{diaHoje.tipo === 'pilates' ? '🧘' : '😴'}</span>
            </div>
            <div>
              <p className="font-medium text-sm capitalize">{diaHoje.tipo}</p>
              <p className="text-white/40 text-xs">{diaHoje.tipo === 'pilates' ? '6h–7h · foco em core' : 'Recuperação ativa'}</p>
            </div>
          </div>
        </div>
      )}

      <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2 mt-5">Registrar</p>
      <div className="grid grid-cols-2 gap-3 mb-5">
        <Link href="/alimentacao" className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
          <Utensils size={20} className="text-[#1D9E75] mb-2" />
          <p className="font-medium text-sm">Alimentação</p>
          <p className="text-white/40 text-xs mt-0.5">Registrar refeição</p>
        </Link>
        <Link href="/hidratacao" className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
          <Droplets size={20} className="text-[#378ADD] mb-2" />
          <p className="font-medium text-sm">Hidratação</p>
          <p className="text-white/40 text-xs mt-0.5">Meta: {(META_HIDRATACAO_ML/1000).toFixed(1)}L/dia</p>
        </Link>
      </div>

      <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">Semana</p>
      <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 mb-3">
        <div className="flex justify-between">
          {SEMANA.map((item, idx) => {
            const isHoje = idx === idxHoje
            const cor = item.treino ? FICHA_TREINO[item.treino].cor : item.tipo === 'pilates' ? '#EF9F27' : '#333'
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <span className={`text-[10px] ${isHoje ? 'text-white font-medium' : 'text-white/30'}`}>{item.dia}</span>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
                  style={{ background: isHoje ? cor : cor + '33', color: isHoje ? '#fff' : cor }}>
                  {item.treino || (item.tipo === 'pilates' ? 'P' : '—')}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Link href="/insights" className="flex items-center justify-between bg-[#7F77DD]/10 rounded-2xl p-4 border border-[#7F77DD]/20">
        <div className="flex items-center gap-3">
          <TrendingUp size={20} className="text-[#7F77DD]" />
          <div>
            <p className="font-medium text-sm">Ver insights da semana</p>
            <p className="text-white/40 text-xs">Análise com seus dados reais</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-white/30" />
      </Link>
    </div>
  )
}
