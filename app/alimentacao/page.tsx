'use client'
import { useState, useEffect } from 'react'
import { PLANO_ALIMENTAR } from '@/lib/dados'
import type { Refeicao } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

const REFEICOES: { key: Refeicao; label: string; emoji: string }[] = [
  { key: 'cafe_manha', label: 'Café da manhã', emoji: '☀️' },
  { key: 'lanche_manha', label: 'Lanche manhã', emoji: '🍎' },
  { key: 'almoco', label: 'Almoço', emoji: '🍽️' },
  { key: 'lanche_tarde', label: 'Lanche tarde', emoji: '🥤' },
  { key: 'jantar', label: 'Jantar', emoji: '🌙' },
]

interface FormState { proteina: number; carb: number; gordura: number; obs: string }

export default function AlimentacaoPage() {
  const [expandido, setExpandido] = useState<Refeicao | null>('cafe_manha')
  const [registradas, setRegistradas] = useState<Set<Refeicao>>(new Set())
  const [form, setForm] = useState<Partial<Record<Refeicao, FormState>>>({})
  const hoje = new Date().toISOString().split('T')[0]

  useEffect(() => { carregarDia() }, [])

  const carregarDia = async () => {
    const { data } = await supabase.from('alimentacao_log').select('refeicao').eq('user_id', 'manu').eq('data', hoje)
    if (data) setRegistradas(new Set((data as any[]).map((d: any) => d.refeicao as Refeicao)))
  }

  const setField = (ref: Refeicao, campo: keyof FormState, val: string | number) => {
    setForm(prev => ({ ...prev, [ref]: { proteina: 0, carb: 0, gordura: 0, obs: '', ...(prev[ref] || {}), [campo]: val } }))
  }

  const salvar = async (ref: Refeicao) => {
    const f = form[ref] || { proteina: 0, carb: 0, gordura: 0, obs: '' }
    await supabase.from('alimentacao_log').insert({
      user_id: 'manu', data: hoje, refeicao: ref,
      itens: [f.obs || ref], proteina_g: f.proteina, carb_g: f.carb, gordura_g: f.gordura,
    } as any)
    setRegistradas(prev => new Set([...prev, ref]))
    setExpandido(null)
  }

  const totalProteina = Object.values(form).reduce((sum, f) => sum + (Number(f?.proteina) || 0), 0)
  const plano = PLANO_ALIMENTAR as Record<string, any>

  return (
    <div className="px-4 pt-8 pb-4">
      <h1 className="text-xl font-semibold mb-5">Alimentação</h1>

      <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Proteína hoje</p>
          <p className="text-sm font-medium">{Math.round(totalProteina)}g <span className="text-white/30">/ 130g</span></p>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-[#1D9E75] rounded-full transition-all duration-500"
            style={{ width: `${Math.min((totalProteina / 130) * 100, 100)}%` }} />
        </div>
      </div>

      <div className="space-y-2">
        {REFEICOES.map(({ key, label, emoji }) => {
          const open = expandido === key
          const feita = registradas.has(key)
          const p = plano[key] || {}

          return (
            <div key={key} className={`bg-[#1a1a1a] rounded-2xl border overflow-hidden ${feita ? 'border-[#1D9E75]/30' : 'border-white/5'}`}>
              <button className="w-full flex items-center justify-between p-4" onClick={() => setExpandido(open ? null : key)}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${feita ? 'bg-[#1D9E75]/10' : 'bg-white/5'}`}>
                    {feita ? <Check size={18} className="text-[#1D9E75]" /> : emoji}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-white/40 text-xs">{p.horario} · meta ~{p.meta_proteina}g prot.</p>
                  </div>
                </div>
                {open ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
              </button>

              {open && (
                <div className="px-4 pb-4 border-t border-white/5">
                  <div className="mt-3 mb-3 text-white/50 text-xs space-y-1 leading-relaxed">
                    {p.opcoes ? (
                      p.opcoes.map((op: string, i: number) => <p key={i}>• {op}</p>)
                    ) : (
                      <>
                        {p.carb && Array.isArray(p.carb) && <p><span className="text-white/30">Carb: </span>{p.carb.join(' / ')}</p>}
                        {p.proteina && Array.isArray(p.proteina) && <p><span className="text-white/30">Proteína: </span>{p.proteina.join(' / ')}</p>}
                        {p.legumes && <p><span className="text-white/30">Legumes: </span>{p.legumes}</p>}
                        {p.extra && <p><span className="text-white/30">Extra: </span>{p.extra}</p>}
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {([['proteina', 'Proteína g', '#1D9E75'], ['carb', 'Carb g', '#378ADD'], ['gordura', 'Gordura g', '#EF9F27']] as const).map(([campo, lbl, cor]) => (
                      <div key={campo}>
                        <label className="text-xs mb-1 block" style={{ color: cor }}>{lbl}</label>
                        <input type="number" min="0" inputMode="numeric"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-2 py-2.5 text-sm text-center focus:outline-none focus:border-[#7F77DD]"
                          value={form[key]?.[campo] || ''}
                          onChange={e => setField(key, campo, Number(e.target.value))} />
                      </div>
                    ))}
                  </div>

                  <input type="text" placeholder="O que você comeu? (opcional)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm mb-3 focus:outline-none focus:border-[#7F77DD]"
                    value={form[key]?.obs || ''}
                    onChange={e => setField(key, 'obs', e.target.value)} />

                  <button onClick={() => salvar(key)}
                    className="w-full py-3 rounded-xl bg-[#1D9E75] font-medium text-sm flex items-center justify-center gap-2">
                    <Check size={16} /> Registrar refeição
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
