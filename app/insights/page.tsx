'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { TrendingUp, Loader2, RefreshCw } from 'lucide-react'

export default function InsightsPage() {
  const [insight, setInsight] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const gerarInsights = async () => {
    setLoading(true)
    setErro(null)
    setInsight(null)
    try {
      const hoje = new Date()
      const seteDiasAtras = new Date(hoje)
      seteDiasAtras.setDate(hoje.getDate() - 7)
      const dataInicio = seteDiasAtras.toISOString().split('T')[0]
      const dataFim = hoje.toISOString().split('T')[0]

      const [r1, r2, r3, r4] = await Promise.all([
        supabase.from('treinos_log').select('*').eq('user_id', 'manu').gte('data', dataInicio).lte('data', dataFim).order('data', { ascending: false }),
        supabase.from('alimentacao_log').select('*').eq('user_id', 'manu').gte('data', dataInicio).lte('data', dataFim).order('data', { ascending: false }),
        supabase.from('hidratacao_log').select('*').eq('user_id', 'manu').gte('data', dataInicio).lte('data', dataFim).order('data', { ascending: false }),
        supabase.from('medidas_log').select('*').eq('user_id', 'manu').gte('data', dataInicio).lte('data', dataFim).order('data', { ascending: false }),
      ])

      const treinos = (r1.data || []) as any[]
      const alimentacao = (r2.data || []) as any[]
      const hidratacao = (r3.data || []) as any[]
      const medidas = (r4.data || []) as any[]

      const datasUnicas = new Set(alimentacao.map((a: any) => a.data)).size
      const mediaProteina = alimentacao.length
        ? Math.round(alimentacao.reduce((s: number, a: any) => s + (a.proteina_g || 0), 0) / Math.max(1, datasUnicas))
        : 0
      const mediaHidratacao = hidratacao.length
        ? Math.round(hidratacao.reduce((s: number, h: any) => s + (h.ml_total || 0), 0) / hidratacao.length)
        : 0

      const dados = {
        periodo: `${dataInicio} a ${dataFim}`,
        treinos_realizados: treinos.length,
        treinos,
        alimentacao,
        media_proteina_diaria: mediaProteina,
        hidratacao,
        media_hidratacao_ml: mediaHidratacao,
        medidas,
      }

      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dados }),
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setInsight(json.insight)
    } catch {
      setErro('Erro ao gerar insights. Verifique sua conexão e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const renderMarkdown = (text: string) =>
    text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-base font-semibold text-white mt-4 mb-1.5">{line.slice(3)}</h2>
      if (line.startsWith('### ')) return <h3 key={i} className="text-sm font-semibold text-[#7F77DD] mt-3 mb-1">{line.slice(4)}</h3>
      if (line.startsWith('- ') || line.startsWith('• ')) return <p key={i} className="text-sm text-white/70 ml-3 mb-1">• {line.slice(2)}</p>
      if (line.trim() === '') return <div key={i} className="h-1" />
      const parts = line.split(/\*\*(.*?)\*\*/g)
      return (
        <p key={i} className="text-sm text-white/70 mb-1 leading-relaxed">
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white font-medium">{p}</strong> : p)}
        </p>
      )
    })

  return (
    <div className="px-4 pt-8 pb-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#7F77DD]/20 flex items-center justify-center">
          <TrendingUp size={20} className="text-[#7F77DD]" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Insights</h1>
          <p className="text-white/40 text-xs">Análise dos últimos 7 dias pela Claude</p>
        </div>
      </div>

      {!insight && !loading && (
        <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-white/5 text-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#7F77DD]/10 flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={28} className="text-[#7F77DD]" />
          </div>
          <p className="font-medium mb-2">Análise inteligente</p>
          <p className="text-white/40 text-sm mb-5 leading-relaxed">
            A Claude lê seus treinos, alimentação e hidratação dos últimos 7 dias e gera um relatório personalizado para acelerar seus resultados.
          </p>
          <button onClick={gerarInsights}
            className="w-full py-3.5 rounded-2xl bg-[#7F77DD] font-medium flex items-center justify-center gap-2">
            <TrendingUp size={18} /> Gerar insights
          </button>
        </div>
      )}

      {loading && (
        <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 text-center">
          <Loader2 size={32} className="text-[#7F77DD] animate-spin mx-auto mb-3" />
          <p className="font-medium">Analisando seus dados...</p>
          <p className="text-white/40 text-sm mt-1">Isso pode levar alguns segundos</p>
        </div>
      )}

      {erro && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-4 text-red-400 text-sm">{erro}</div>
      )}

      {insight && (
        <>
          <div className="bg-[#1a1a1a] rounded-2xl border border-[#7F77DD]/20 p-5 mb-4">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
              <div className="w-6 h-6 rounded-full bg-[#7F77DD] flex items-center justify-center text-xs font-bold">C</div>
              <span className="text-sm text-white/50">Claude · análise personalizada</span>
            </div>
            <div>{renderMarkdown(insight)}</div>
          </div>
          <button onClick={gerarInsights} disabled={loading}
            className="w-full py-3 rounded-2xl border border-white/10 text-sm text-white/40 flex items-center justify-center gap-2">
            <RefreshCw size={14} /> Atualizar análise
          </button>
        </>
      )}
    </div>
  )
}
