'use client'
import { useState } from 'react'
import { Search, Plus, ChevronRight } from 'lucide-react'
import { buscarAlimentos, calcularMacros, type Alimento } from '@/lib/alimentos'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Props {
  onAdicionar: (proteina: number, carb: number, gordura: number, nome: string) => void
}

export function AlimentoBusca({ onAdicionar }: Props) {
  const [aberto, setAberto] = useState(false)
  const [query, setQuery] = useState('')
  const [selecionado, setSelecionado] = useState<Alimento | null>(null)
  const [gramas, setGramas] = useState('')

  const resultados = buscarAlimentos(query)
  const macros = selecionado && gramas
    ? calcularMacros(selecionado, Number(gramas))
    : null

  const handleSelecionar = (a: Alimento) => {
    setSelecionado(a)
    setGramas(String(a.porcao.gramas))
    setQuery('')
  }

  const handleAdicionar = () => {
    if (!selecionado || !gramas) return
    const m = calcularMacros(selecionado, Number(gramas))
    onAdicionar(m.proteina, m.carb, m.gordura, `${selecionado.nome} (${gramas}g)`)
    setSelecionado(null)
    setGramas('')
    setAberto(false)
  }

  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="w-full flex items-center gap-2 py-2.5 text-white/30 text-xs hover:text-white/50 transition-colors"
      >
        <Search size={13} />
        Buscar alimento para estimar macros
        <ChevronRight size={13} className="ml-auto" />
      </button>
    )
  }

  return (
    <div className="border-t border-white/5 pt-3 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Buscar alimento</p>
        <button onClick={() => { setAberto(false); setSelecionado(null); setQuery('') }}
          className="text-white/30 text-xs hover:text-white/60">
          fechar
        </button>
      </div>

      {!selecionado ? (
        <>
          <Input
            autoFocus
            placeholder="Ex: pão francês, frango, arroz..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />

          {resultados.length > 0 && (
            <div className="space-y-1">
              {resultados.map(a => (
                <button
                  key={a.id}
                  onClick={() => handleSelecionar(a)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left"
                >
                  <div>
                    <p className="text-sm">{a.nome}</p>
                    <p className="text-white/30 text-xs">
                      por 100g · {a.por100g.proteina}g P · {a.por100g.carb}g C · {a.por100g.gordura}g G
                    </p>
                  </div>
                  <span className="text-white/20 text-xs ml-2 flex-shrink-0">{a.porcao.descricao}</span>
                </button>
              ))}
            </div>
          )}

          {query.length > 1 && resultados.length === 0 && (
            <p className="text-center text-white/20 text-xs py-2">Nenhum alimento encontrado</p>
          )}
        </>
      ) : (
        <div className="space-y-3">
          {/* Alimento selecionado */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{selecionado.nome}</p>
              <p className="text-white/30 text-xs">{selecionado.porcao.descricao} = {selecionado.porcao.gramas}g</p>
            </div>
            <button
              onClick={() => { setSelecionado(null); setGramas('') }}
              className="text-white/30 text-xs hover:text-white/60"
            >
              trocar
            </button>
          </div>

          {/* Input de gramas */}
          <div className="flex items-center gap-2">
            <Input
              type="number"
              inputMode="numeric"
              placeholder="gramas"
              value={gramas}
              onChange={e => setGramas(e.target.value)}
              className="text-center w-24 flex-shrink-0"
            />
            <span className="text-white/40 text-sm">gramas</span>
          </div>

          {/* Preview dos macros */}
          {macros && Number(gramas) > 0 && (
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/[0.04] rounded-xl py-2">
                <p className="text-sm font-semibold text-[#1D9E75]">{macros.proteina}g</p>
                <p className="text-white/30 text-[10px]">Proteína</p>
              </div>
              <div className="bg-white/[0.04] rounded-xl py-2">
                <p className="text-sm font-semibold text-[#378ADD]">{macros.carb}g</p>
                <p className="text-white/30 text-[10px]">Carb</p>
              </div>
              <div className="bg-white/[0.04] rounded-xl py-2">
                <p className="text-sm font-semibold text-[#EF9F27]">{macros.gordura}g</p>
                <p className="text-white/30 text-[10px]">Gordura</p>
              </div>
            </div>
          )}

          <Button
            className="w-full"
            disabled={!gramas || Number(gramas) <= 0}
            onClick={handleAdicionar}
          >
            <Plus size={15} />
            Adicionar aos macros
          </Button>
        </div>
      )}
    </div>
  )
}
