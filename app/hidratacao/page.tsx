'use client'
import { useState, useEffect } from 'react'
import { Droplets, Plus, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { META_HIDRATACAO_ML } from '@/lib/dados'

const OPCOES_ML = [150, 200, 300, 500]

interface Registro { hora: string; ml: number }

export default function HidratacaoPage() {
  const [total, setTotal] = useState(0)
  const [registros, setRegistros] = useState<Registro[]>([])
  const [saved, setSaved] = useState(false)
  const hoje = new Date().toISOString().split('T')[0]

  useEffect(() => { carregarDia() }, [])

  const carregarDia = async () => {
    const { data } = await supabase.from('hidratacao_log').select('ml_total, registros').eq('user_id', 'manu').eq('data', hoje).single()
    if (data) {
      setTotal((data as any).ml_total || 0)
      setRegistros(((data as any).registros as Registro[]) || [])
    }
  }

  const adicionar = async (ml: number) => {
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    const novosRegistros = [...registros, { hora, ml }]
    const novoTotal = total + ml
    setTotal(novoTotal)
    setRegistros(novosRegistros)

    const { data: existing } = await supabase.from('hidratacao_log').select('id').eq('user_id', 'manu').eq('data', hoje).single()
    if (existing) {
      // @ts-ignore
      await supabase.from('hidratacao_log').update({ ml_total: novoTotal, registros: novosRegistros } as any).eq('id' as any, (existing as any).id)
    } else {
      await supabase.from('hidratacao_log').insert({ user_id: 'manu', data: hoje, ml_total: novoTotal, registros: novosRegistros } as any)
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const pct = Math.min((total / META_HIDRATACAO_ML) * 100, 100)
  const litros = (total / 1000).toFixed(2)
  const meta = (META_HIDRATACAO_ML / 1000).toFixed(1)

  return (
    <div className="px-4 pt-8 pb-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Hidratação</h1>
        {saved && <div className="flex items-center gap-1 text-[#1D9E75] text-sm"><Check size={14} /> Salvo</div>}
      </div>

      <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-white/5 mb-5 flex flex-col items-center">
        <div className="relative w-40 h-40 mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#ffffff0a" strokeWidth="8" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#378ADD" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
              strokeLinecap="round" className="transition-all duration-500" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Droplets size={20} className="text-[#378ADD] mb-1" />
            <span className="text-2xl font-bold">{litros}L</span>
            <span className="text-white/40 text-xs">de {meta}L</span>
          </div>
        </div>
        <div className="flex gap-8 text-center">
          <div>
            <p className="text-lg font-semibold text-[#378ADD]">{Math.round(pct)}%</p>
            <p className="text-white/40 text-xs">completado</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{Math.max(0, Math.ceil((META_HIDRATACAO_ML - total) / 250))}</p>
            <p className="text-white/40 text-xs">copos restantes</p>
          </div>
        </div>
      </div>

      <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">Adicionar</p>
      <div className="grid grid-cols-4 gap-2 mb-5">
        {OPCOES_ML.map(ml => (
          <button key={ml} onClick={() => adicionar(ml)}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl py-4 flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
            <Plus size={14} className="text-[#378ADD]" />
            <span className="text-sm font-medium">{ml}ml</span>
          </button>
        ))}
      </div>

      {registros.length > 0 && (
        <>
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">Hoje</p>
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
            {registros.slice().reverse().map((r, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#378ADD]/10 flex items-center justify-center">
                    <Droplets size={13} className="text-[#378ADD]" />
                  </div>
                  <span className="text-sm">{r.ml}ml</span>
                </div>
                <span className="text-white/40 text-xs">{r.hora}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
