// Valores por 100g — baseado na Tabela TACO e USDA
// porcao: porção de referência comum com peso em gramas

export interface Alimento {
  id: string
  nome: string
  categoria: string
  por100g: { proteina: number; carb: number; gordura: number }
  porcao: { descricao: string; gramas: number }
}

export const ALIMENTOS: Alimento[] = [
  // ── Carnes & Aves ────────────────────────────────────────────────────────────
  { id: 'frango-peito', nome: 'Frango — peito grelhado', categoria: 'Proteína', por100g: { proteina: 31, carb: 0, gordura: 3 }, porcao: { descricao: '1 filé médio', gramas: 130 } },
  { id: 'frango-coxa', nome: 'Frango — coxa sem pele', categoria: 'Proteína', por100g: { proteina: 24, carb: 0, gordura: 7 }, porcao: { descricao: '1 coxa', gramas: 100 } },
  { id: 'carne-moida', nome: 'Carne moída patinho', categoria: 'Proteína', por100g: { proteina: 21, carb: 0, gordura: 10 }, porcao: { descricao: 'porção', gramas: 100 } },
  { id: 'patinho', nome: 'Patinho grelhado', categoria: 'Proteína', por100g: { proteina: 27, carb: 0, gordura: 5 }, porcao: { descricao: 'bife médio', gramas: 120 } },
  { id: 'alcatra', nome: 'Alcatra grelhada', categoria: 'Proteína', por100g: { proteina: 26, carb: 0, gordura: 8 }, porcao: { descricao: 'bife médio', gramas: 120 } },
  { id: 'file-mignon', nome: 'Filé mignon grelhado', categoria: 'Proteína', por100g: { proteina: 29, carb: 0, gordura: 6 }, porcao: { descricao: 'medalhão', gramas: 100 } },

  // ── Peixes & Frutos do Mar ───────────────────────────────────────────────────
  { id: 'salmao', nome: 'Salmão grelhado', categoria: 'Proteína', por100g: { proteina: 25, carb: 0, gordura: 14 }, porcao: { descricao: '1 posta média', gramas: 150 } },
  { id: 'tilapia', nome: 'Tilápia grelhada', categoria: 'Proteína', por100g: { proteina: 23, carb: 0, gordura: 2 }, porcao: { descricao: '1 filé médio', gramas: 130 } },
  { id: 'atum-lata', nome: 'Atum em água (lata)', categoria: 'Proteína', por100g: { proteina: 23, carb: 0, gordura: 2 }, porcao: { descricao: '1 lata', gramas: 120 } },
  { id: 'sardinha', nome: 'Sardinha em óleo', categoria: 'Proteína', por100g: { proteina: 21, carb: 0, gordura: 11 }, porcao: { descricao: '1 lata', gramas: 90 } },
  { id: 'camarao', nome: 'Camarão cozido', categoria: 'Proteína', por100g: { proteina: 20, carb: 1, gordura: 1 }, porcao: { descricao: 'porção', gramas: 100 } },

  // ── Ovos & Laticínios ────────────────────────────────────────────────────────
  { id: 'ovo-cozido', nome: 'Ovo inteiro cozido', categoria: 'Proteína', por100g: { proteina: 13, carb: 1, gordura: 11 }, porcao: { descricao: '1 ovo', gramas: 50 } },
  { id: 'clara-ovo', nome: 'Clara de ovo', categoria: 'Proteína', por100g: { proteina: 11, carb: 1, gordura: 0 }, porcao: { descricao: '1 clara', gramas: 33 } },
  { id: 'iogurte-grego', nome: 'Iogurte grego integral', categoria: 'Laticínio', por100g: { proteina: 9, carb: 4, gordura: 8 }, porcao: { descricao: '1 pote 200g', gramas: 200 } },
  { id: 'iogurte-desnatado', nome: 'Iogurte natural desnatado', categoria: 'Laticínio', por100g: { proteina: 4, carb: 6, gordura: 0 }, porcao: { descricao: '1 pote 200g', gramas: 200 } },
  { id: 'cottage', nome: 'Cottage', categoria: 'Laticínio', por100g: { proteina: 12, carb: 3, gordura: 4 }, porcao: { descricao: '3 col. sopa', gramas: 100 } },
  { id: 'queijo-mussarela', nome: 'Queijo mussarela', categoria: 'Laticínio', por100g: { proteina: 22, carb: 3, gordura: 17 }, porcao: { descricao: '2 fatias', gramas: 40 } },
  { id: 'queijo-ricota', nome: 'Ricota', categoria: 'Laticínio', por100g: { proteina: 11, carb: 3, gordura: 5 }, porcao: { descricao: '2 col. sopa', gramas: 80 } },
  { id: 'leite-integral', nome: 'Leite integral', categoria: 'Laticínio', por100g: { proteina: 3, carb: 5, gordura: 3 }, porcao: { descricao: '1 copo (200ml)', gramas: 200 } },
  { id: 'leite-desnatado', nome: 'Leite desnatado', categoria: 'Laticínio', por100g: { proteina: 3, carb: 5, gordura: 0 }, porcao: { descricao: '1 copo (200ml)', gramas: 200 } },
  { id: 'whey', nome: 'Whey protein (pó)', categoria: 'Suplemento', por100g: { proteina: 80, carb: 8, gordura: 2 }, porcao: { descricao: '1 scoop (30g)', gramas: 30 } },

  // ── Grãos & Cereais ──────────────────────────────────────────────────────────
  { id: 'arroz-branco', nome: 'Arroz branco cozido', categoria: 'Carboidrato', por100g: { proteina: 2, carb: 28, gordura: 0 }, porcao: { descricao: '4 col. sopa', gramas: 125 } },
  { id: 'arroz-integral', nome: 'Arroz integral cozido', categoria: 'Carboidrato', por100g: { proteina: 3, carb: 26, gordura: 1 }, porcao: { descricao: '4 col. sopa', gramas: 125 } },
  { id: 'feijao-cozido', nome: 'Feijão preto cozido', categoria: 'Carboidrato', por100g: { proteina: 5, carb: 14, gordura: 1 }, porcao: { descricao: '1 concha média', gramas: 86 } },
  { id: 'feijao-carioca', nome: 'Feijão carioca cozido', categoria: 'Carboidrato', por100g: { proteina: 5, carb: 14, gordura: 0 }, porcao: { descricao: '1 concha média', gramas: 86 } },
  { id: 'lentilha', nome: 'Lentilha cozida', categoria: 'Carboidrato', por100g: { proteina: 9, carb: 20, gordura: 0 }, porcao: { descricao: '4 col. sopa', gramas: 100 } },
  { id: 'grao-de-bico', nome: 'Grão-de-bico cozido', categoria: 'Carboidrato', por100g: { proteina: 7, carb: 27, gordura: 3 }, porcao: { descricao: '4 col. sopa', gramas: 100 } },
  { id: 'aveia', nome: 'Aveia em flocos', categoria: 'Carboidrato', por100g: { proteina: 14, carb: 64, gordura: 7 }, porcao: { descricao: '4 col. sopa', gramas: 40 } },
  { id: 'macarrao', nome: 'Macarrão integral cozido', categoria: 'Carboidrato', por100g: { proteina: 5, carb: 23, gordura: 1 }, porcao: { descricao: 'porção', gramas: 120 } },
  { id: 'quinoa', nome: 'Quinoa cozida', categoria: 'Carboidrato', por100g: { proteina: 4, carb: 22, gordura: 2 }, porcao: { descricao: '4 col. sopa', gramas: 100 } },

  // ── Pães & Massas ────────────────────────────────────────────────────────────
  { id: 'pao-frances', nome: 'Pão francês', categoria: 'Pão', por100g: { proteina: 8, carb: 58, gordura: 2 }, porcao: { descricao: '1 unidade', gramas: 50 } },
  { id: 'pao-forma', nome: 'Pão de forma tradicional', categoria: 'Pão', por100g: { proteina: 8, carb: 54, gordura: 4 }, porcao: { descricao: '2 fatias', gramas: 50 } },
  { id: 'pao-integral', nome: 'Pão de forma integral', categoria: 'Pão', por100g: { proteina: 9, carb: 47, gordura: 3 }, porcao: { descricao: '2 fatias', gramas: 50 } },
  { id: 'tapioca', nome: 'Tapioca (goma)', categoria: 'Pão', por100g: { proteina: 0, carb: 88, gordura: 0 }, porcao: { descricao: '1 tapioca', gramas: 60 } },
  { id: 'tortilha', nome: 'Wrap / Tortilha integral', categoria: 'Pão', por100g: { proteina: 8, carb: 46, gordura: 5 }, porcao: { descricao: '1 unidade', gramas: 40 } },

  // ── Tubérculos ───────────────────────────────────────────────────────────────
  { id: 'batata-doce', nome: 'Batata-doce cozida', categoria: 'Carboidrato', por100g: { proteina: 1, carb: 23, gordura: 0 }, porcao: { descricao: '1 unidade média', gramas: 130 } },
  { id: 'batata-ingles', nome: 'Batata inglesa cozida', categoria: 'Carboidrato', por100g: { proteina: 2, carb: 15, gordura: 0 }, porcao: { descricao: '1 unidade média', gramas: 130 } },
  { id: 'mandioca', nome: 'Mandioca cozida', categoria: 'Carboidrato', por100g: { proteina: 1, carb: 30, gordura: 0 }, porcao: { descricao: '1 pedaço', gramas: 100 } },
  { id: 'inhame', nome: 'Inhame cozido', categoria: 'Carboidrato', por100g: { proteina: 1, carb: 27, gordura: 0 }, porcao: { descricao: '1 pedaço', gramas: 100 } },

  // ── Frutas ───────────────────────────────────────────────────────────────────
  { id: 'banana-prata', nome: 'Banana prata', categoria: 'Fruta', por100g: { proteina: 1, carb: 26, gordura: 0 }, porcao: { descricao: '1 unidade', gramas: 80 } },
  { id: 'banana-maca', nome: 'Banana maçã', categoria: 'Fruta', por100g: { proteina: 1, carb: 23, gordura: 0 }, porcao: { descricao: '1 unidade', gramas: 70 } },
  { id: 'maca', nome: 'Maçã', categoria: 'Fruta', por100g: { proteina: 0, carb: 15, gordura: 0 }, porcao: { descricao: '1 unidade', gramas: 130 } },
  { id: 'laranja', nome: 'Laranja', categoria: 'Fruta', por100g: { proteina: 1, carb: 12, gordura: 0 }, porcao: { descricao: '1 unidade', gramas: 140 } },
  { id: 'morango', nome: 'Morango', categoria: 'Fruta', por100g: { proteina: 1, carb: 8, gordura: 0 }, porcao: { descricao: '1 xícara', gramas: 150 } },
  { id: 'uva', nome: 'Uva', categoria: 'Fruta', por100g: { proteina: 1, carb: 18, gordura: 0 }, porcao: { descricao: '1 cacho pequeno', gramas: 100 } },
  { id: 'mamao', nome: 'Mamão papaia', categoria: 'Fruta', por100g: { proteina: 1, carb: 10, gordura: 0 }, porcao: { descricao: '1 fatia', gramas: 150 } },
  { id: 'manga', nome: 'Manga', categoria: 'Fruta', por100g: { proteina: 1, carb: 17, gordura: 0 }, porcao: { descricao: '½ unidade', gramas: 130 } },
  { id: 'melancia', nome: 'Melancia', categoria: 'Fruta', por100g: { proteina: 1, carb: 8, gordura: 0 }, porcao: { descricao: '1 fatia', gramas: 200 } },
  { id: 'abacate', nome: 'Abacate', categoria: 'Gordura', por100g: { proteina: 2, carb: 9, gordura: 15 }, porcao: { descricao: '½ unidade', gramas: 100 } },
  { id: 'kiwi', nome: 'Kiwi', categoria: 'Fruta', por100g: { proteina: 1, carb: 15, gordura: 0 }, porcao: { descricao: '1 unidade', gramas: 70 } },

  // ── Legumes & Verduras ───────────────────────────────────────────────────────
  { id: 'brocolis', nome: 'Brócolis cozido', categoria: 'Legume', por100g: { proteina: 3, carb: 5, gordura: 0 }, porcao: { descricao: '1 xícara', gramas: 130 } },
  { id: 'espinafre', nome: 'Espinafre refogado', categoria: 'Legume', por100g: { proteina: 3, carb: 3, gordura: 1 }, porcao: { descricao: '2 col. sopa', gramas: 60 } },
  { id: 'cenoura', nome: 'Cenoura crua', categoria: 'Legume', por100g: { proteina: 1, carb: 10, gordura: 0 }, porcao: { descricao: '1 unidade', gramas: 80 } },
  { id: 'abobrinha', nome: 'Abobrinha refogada', categoria: 'Legume', por100g: { proteina: 1, carb: 3, gordura: 1 }, porcao: { descricao: '½ unidade', gramas: 80 } },
  { id: 'tomate', nome: 'Tomate', categoria: 'Legume', por100g: { proteina: 1, carb: 4, gordura: 0 }, porcao: { descricao: '1 unidade', gramas: 100 } },
  { id: 'pepino', nome: 'Pepino', categoria: 'Legume', por100g: { proteina: 1, carb: 3, gordura: 0 }, porcao: { descricao: '½ pepino', gramas: 100 } },
  { id: 'alface', nome: 'Alface', categoria: 'Legume', por100g: { proteina: 1, carb: 2, gordura: 0 }, porcao: { descricao: '4 folhas', gramas: 50 } },
  { id: 'couve-flor', nome: 'Couve-flor cozida', categoria: 'Legume', por100g: { proteina: 2, carb: 5, gordura: 0 }, porcao: { descricao: '1 xícara', gramas: 120 } },
  { id: 'cogumelo', nome: 'Cogumelo paris', categoria: 'Legume', por100g: { proteina: 3, carb: 4, gordura: 0 }, porcao: { descricao: '5 unidades', gramas: 80 } },
  { id: 'chuchu', nome: 'Chuchu cozido', categoria: 'Legume', por100g: { proteina: 1, carb: 4, gordura: 0 }, porcao: { descricao: '½ unidade', gramas: 100 } },
  { id: 'pimentao', nome: 'Pimentão', categoria: 'Legume', por100g: { proteina: 1, carb: 6, gordura: 0 }, porcao: { descricao: '½ unidade', gramas: 80 } },

  // ── Gorduras & Oleaginosas ───────────────────────────────────────────────────
  { id: 'amendoim', nome: 'Amendoim torrado', categoria: 'Gordura', por100g: { proteina: 26, carb: 18, gordura: 49 }, porcao: { descricao: '1 punhado', gramas: 30 } },
  { id: 'castanha-caju', nome: 'Castanha de caju', categoria: 'Gordura', por100g: { proteina: 18, carb: 28, gordura: 44 }, porcao: { descricao: '1 punhado', gramas: 30 } },
  { id: 'castanha-para', nome: 'Castanha-do-pará', categoria: 'Gordura', por100g: { proteina: 14, carb: 12, gordura: 66 }, porcao: { descricao: '3 unidades', gramas: 20 } },
  { id: 'amendas', nome: 'Amêndoas', categoria: 'Gordura', por100g: { proteina: 21, carb: 22, gordura: 50 }, porcao: { descricao: '1 punhado', gramas: 30 } },
  { id: 'nozes', nome: 'Nozes', categoria: 'Gordura', por100g: { proteina: 15, carb: 14, gordura: 65 }, porcao: { descricao: '1 punhado', gramas: 30 } },
  { id: 'pasta-amendoim', nome: 'Pasta de amendoim', categoria: 'Gordura', por100g: { proteina: 25, carb: 20, gordura: 50 }, porcao: { descricao: '1 col. sopa', gramas: 20 } },
  { id: 'azeite', nome: 'Azeite de oliva', categoria: 'Gordura', por100g: { proteina: 0, carb: 0, gordura: 100 }, porcao: { descricao: '1 col. sopa', gramas: 14 } },

  // ── Outros ───────────────────────────────────────────────────────────────────
  { id: 'granola', nome: 'Granola', categoria: 'Carboidrato', por100g: { proteina: 8, carb: 62, gordura: 11 }, porcao: { descricao: '4 col. sopa', gramas: 40 } },
  { id: 'mel', nome: 'Mel', categoria: 'Carboidrato', por100g: { proteina: 0, carb: 82, gordura: 0 }, porcao: { descricao: '1 col. sopa', gramas: 20 } },
  { id: 'proteina-vegetal', nome: 'PTS (proteína de soja)', categoria: 'Proteína', por100g: { proteina: 52, carb: 30, gordura: 2 }, porcao: { descricao: '½ xícara seca', gramas: 40 } },
]

export const CATEGORIAS = [...new Set(ALIMENTOS.map(a => a.categoria))]

export function buscarAlimentos(query: string): Alimento[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  return ALIMENTOS.filter(a =>
    a.nome.toLowerCase().includes(q) || a.categoria.toLowerCase().includes(q)
  ).slice(0, 8)
}

export function calcularMacros(alimento: Alimento, gramas: number) {
  const f = gramas / 100
  return {
    proteina: Math.round(alimento.por100g.proteina * f * 10) / 10,
    carb:     Math.round(alimento.por100g.carb     * f * 10) / 10,
    gordura:  Math.round(alimento.por100g.gordura  * f * 10) / 10,
  }
}
