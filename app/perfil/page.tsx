'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Check, Scale, TrendingDown } from 'lucide-react'

export default function MedidasPage() {
  const [form, setForm] = useState({ peso_kg: '', gordura_pct: '', cintura_cm: '', quadril_cm: '', observacoes: '' })
  const [historico, setHistorico] = useState<any[]>([])
  const [saved, setSaved] = useState(false)
  const hoje = new Date().toISOString().split('T')[0]

  useEffect(() => { carregarHistorico() }, [])

  const carregarHistorico = async () => {
    const { data } = await supabase
      .from('medidas_log')
      .select('*')
      .eq('user_id', 'manu')
      .order('data', { ascending: false })
      .limit(10)
    if (data) setHistorico(data)
  }

  const salvar = async () => {
    const payload: any = { user_id: 'manu', data: hoje }
    if (form.peso_kg) payload.peso_kg = Number(form.peso_kg)
    if (form.gordura_pct) payload.gordura_pct = Number(form.gordura_pct)
    if (form.cintura_cm) payload.cintura_cm = Number(form.cintura_cm)
    if (form.quadril_cm) payload.quadril_cm = Number(form.quadril_cm)
    if (form.observacoes) payload.observacoes = form.observacoes

    await supabase.from('medidas_log').insert(payload)
    setSaved(true)
    setForm({ peso_kg: '', gordura_pct: '', cintura_cm: '', quadril_cm: '', observacoes: '' })
    await carregarHistorico()
    setTimeout(() => setSaved(false), 2000)
  }

  const ultima = historico[0]
  const anterior = historico[1]

  const diff = (campo: string) => {
    if (!ultima || !anterior) return null
    const v1 = (ultima as any)[campo]
    const v2 = (anterior as any)[campo]
    if (!v1 || !v2) return null
    return (v1 - v2).toFixed(1)
  }

  return (
    <div className="px-4 pt-8 pb-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Medidas</h1>
        {saved && <div className="flex items-center gap-1 text-[#1D9E75] text-sm"><Check size={14} /> Salvo</div>}
      </div>

      {/* Último registro */}
      {ultima && (
        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 mb-5">
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">Último registro — {ultima.data}</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Peso', val: ultima.peso_kg, unit: 'kg', campo: 'peso_kg' },
              { label: '% Gordura', val: ultima.gordura_pct, unit: '%', campo: 'gordura_pct' },
              { label: 'Cintura', val: ultima.cintura_cm, unit: 'cm', campo: 'cintura_cm' },
              { label: 'Quadril', val: ultima.quadril_cm, unit: 'cm', campo: 'quadril_cm' },
            ].map(({ label, val, unit, campo }) => {
              const d = diff(campo)
              const positivo = d !== null && Number(d) < 0
              return val ? (
                <div key={campo} className="bg-white/5 rounded-xl p-3">
                  <p className="text-white/40 text-xs mb-1">{label}</p>
                  <p className="text-lg font-semibold">{val}{unit}</p>
                  {d !== null && (
                    <p className={`text-xs mt-0.5 ${positivo ? 'text-[#1D9E75]' : Number(d) > 0 ? 'text-red-400' : 'text-white/30'}`}>
                      {Number(d) > 0 ? '+' : ''}{d}{unit} vs anterior
                    </p>
                  )}
                </div>
              ) : null
            })}
          </div>
        </div>
      )}

      {/* Formulário novo registro */}
      <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">Novo registro — hoje</p>
      <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 mb-5">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { key: 'peso_kg', label: 'Peso (kg)', placeholder: 'ex: 62.5' },
            { key: 'gordura_pct', label: 'Gordura (%)', placeholder: 'ex: 19.5' },
            { key: 'cintura_cm', label: 'Cintura (cm)', placeholder: 'ex: 72' },
            { key: 'quadril_cm', label: 'Quadril (cm)', placeholder: 'ex: 96' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-white/40 text-xs mb-1 block">{label}</label>
              <input type="number" step="0.1" placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#7F77DD]"
                value={(form as any)[key]}
                onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))} />
            </div>
          ))}
        </div>
        <input type="text" placeholder="Observações (opcional)"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm mb-3 focus:outline-none focus:border-[#7F77DD]"
          value={form.observacoes}
          onChange={e => setForm(prev => ({ ...prev, observacoes: e.target.value }))} />
        <button onClick={salvar}
          className="w-full py-3 rounded-xl bg-[#7F77DD] font-medium text-sm flex items-center justify-center gap-2">
          <Check size={16} /> Salvar medidas
        </button>
      </div>

      {/* Histórico */}
      {historico.length > 1 && (
        <>
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">Histórico</p>
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
            {historico.slice(0, 6).map((m, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <Scale size={14} className="text-white/30" />
                  <span className="text-sm">{m.data}</span>
                </div>
                <div className="flex gap-3 text-xs text-white/50">
                  {m.peso_kg && <span>{m.peso_kg}kg</span>}
                  {m.gordura_pct && <span>{m.gordura_pct}%</span>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
