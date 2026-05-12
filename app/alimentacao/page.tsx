'use client'
import { useState, useEffect } from 'react'
import { Check, ChevronDown, ChevronUp, Utensils } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { PLANO_ALIMENTAR } from '@/lib/dados'
import { useFormState } from '@/contexts/form-state'
import type { Refeicao } from '@/types/database'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AlimentoBusca } from '@/components/AlimentoBusca'

const REFEICOES: { key: Refeicao; label: string; emoji: string }[] = [
  { key: 'cafe_manha',    label: 'Café da manhã',  emoji: '☀️' },
  { key: 'lanche_manha',  label: 'Lanche manhã',   emoji: '🍎' },
  { key: 'almoco',        label: 'Almoço',          emoji: '🍽️' },
  { key: 'lanche_tarde',  label: 'Lanche tarde',    emoji: '🥤' },
  { key: 'jantar',        label: 'Jantar',          emoji: '🌙' },
]

const META_PROTEINA = 130

export default function AlimentacaoPage() {
  const { alimentacaoForm, setAlimentacaoField } = useFormState()
  const [expandido, setExpandido] = useState<Refeicao | null>('cafe_manha')
  const [registradas, setRegistradas] = useState<Set<Refeicao>>(new Set())
  const hoje = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const carregar = async () => {
      const { data } = await supabase
        .from('alimentacao_log')
        .select('refeicao')
        .eq('user_id', 'manu')
        .eq('data', hoje)
      if (data) setRegistradas(new Set((data as any[]).map(d => d.refeicao as Refeicao)))
    }
    carregar()
  }, [hoje])

  const salvar = async (ref: Refeicao) => {
    const f = alimentacaoForm[ref] ?? { proteina: 0, carb: 0, gordura: 0, obs: '' }
    await supabase.from('alimentacao_log').insert({
      user_id: 'manu',
      data: hoje,
      refeicao: ref,
      itens: [f.obs || ref],
      proteina_g: f.proteina,
      carb_g: f.carb,
      gordura_g: f.gordura,
    } as any)
    setRegistradas(prev => new Set([...prev, ref]))
    setExpandido(null)
  }

  const totalProteina = Object.values(alimentacaoForm).reduce(
    (sum, f) => sum + (Number(f?.proteina) || 0),
    0
  )
  const proteinaPct = Math.min((totalProteina / META_PROTEINA) * 100, 100)
  const plano = PLANO_ALIMENTAR as Record<string, any>

  return (
    <div className="px-4 pt-8 pb-4">
      <h1 className="text-xl font-semibold mb-5">Alimentação</h1>

      {/* Proteína do dia */}
      <Card className="p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Proteína hoje</p>
          <p className="text-sm font-medium">
            {Math.round(totalProteina)}g
            <span className="text-white/30"> / {META_PROTEINA}g</span>
          </p>
        </div>
        <Progress value={proteinaPct} color="#1D9E75" />
      </Card>

      {/* Refeições */}
      <div className="space-y-2">
        {REFEICOES.map(({ key, label, emoji }) => {
          const open = expandido === key
          const feita = registradas.has(key)
          const p = plano[key] ?? {}
          const form = alimentacaoForm[key]

          return (
            <Card key={key} className={feita ? 'border-[#1D9E75]/30' : ''}>
              <button
                className="w-full flex items-center justify-between p-4"
                onClick={() => setExpandido(open ? null : key)}
              >
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
                <CardContent className="border-t border-white/5">
                  {/* Sugestões do plano */}
                  <div className="mt-3 mb-4 text-white/50 text-xs space-y-1 leading-relaxed">
                    {p.opcoes ? (
                      (p.opcoes as string[]).map((op: string, i: number) => <p key={i}>• {op}</p>)
                    ) : (
                      <>
                        {Array.isArray(p.carb) && <p><span className="text-white/30">Carb: </span>{p.carb.join(' / ')}</p>}
                        {Array.isArray(p.proteina) && <p><span className="text-white/30">Proteína: </span>{p.proteina.join(' / ')}</p>}
                        {p.legumes && <p><span className="text-white/30">Legumes: </span>{p.legumes}</p>}
                        {p.extra && <p><span className="text-white/30">Extra: </span>{p.extra}</p>}
                      </>
                    )}
                  </div>

                  {/* Inputs de macros */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {([
                      ['proteina', 'Proteína g', '#1D9E75'],
                      ['carb',     'Carb g',     '#378ADD'],
                      ['gordura',  'Gordura g',  '#EF9F27'],
                    ] as const).map(([campo, lbl, cor]) => (
                      <div key={campo}>
                        <label className="text-xs mb-1 block" style={{ color: cor }}>{lbl}</label>
                        <Input
                          type="number"
                          min="0"
                          inputMode="numeric"
                          className="text-center"
                          value={form?.[campo] || ''}
                          onChange={e => setAlimentacaoField(key, campo, Number(e.target.value))}
                        />
                      </div>
                    ))}
                  </div>

                  <Input
                    type="text"
                    placeholder="O que você comeu? (opcional)"
                    className="mb-3"
                    value={form?.obs || ''}
                    onChange={e => setAlimentacaoField(key, 'obs', e.target.value)}
                  />

                  <AlimentoBusca
                    onAdicionar={(prot, carb, gord, nome) => {
                      setAlimentacaoField(key, 'proteina', (Number(form?.proteina) || 0) + prot)
                      setAlimentacaoField(key, 'carb',     (Number(form?.carb)     || 0) + carb)
                      setAlimentacaoField(key, 'gordura',  (Number(form?.gordura)  || 0) + gord)
                      const obsAtual = form?.obs || ''
                      setAlimentacaoField(key, 'obs', obsAtual ? `${obsAtual}, ${nome}` : nome)
                    }}
                  />

                  <Button className="w-full mt-3" onClick={() => salvar(key)}>
                    <Check size={16} />
                    Registrar refeição
                  </Button>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
