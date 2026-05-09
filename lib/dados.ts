// lib/dados.ts

export type TreinoKey = 'A' | 'B' | 'C' | 'D'

export type Serie = {
  reps: number
  carga: number
  feito: boolean
}

export type Exercicio = {
  nome: string
  series: number
  reps: number          // reps alvo (usado como placeholder nos inputs)
  repsMin: number
  repsMax: number
  descanso: number      // segundos
  foco: string          // dica de execução (ex.foco já usado na page)
  prioridade?: boolean
  alerta?: 'safe' | 'caution'
  imagemUrl: string     // gif/imagem demonstrando o exercício
}

export type Treino = {
  nome: string
  dia: string
  duracao: number
  aquecimento: string
  cor: string           // hex — já usado inline na page
  exercicios: Exercicio[]
}


// ─── Ficha de Treino ─────────────────────────────────────────────────────────
export const FICHA_TREINO: Record<TreinoKey, Treino> = {

  // ── TREINO A — Glúteo Máximo + Posterior ──────────────────────────────────
  A: {
    nome: 'MMII — Glúteo + Posterior',
    dia: 'Segunda',
    duracao: 50,
    aquecimento: 'Ponte de glúteo 15 reps + abdução deitada c/ elástico 15 reps cada lado',
    cor: '#c8503a',
    exercicios: [
      {
        nome: 'Hip Thrust',
        series: 4,
        reps: 12,
        repsMin: 10,
        repsMax: 12,
        descanso: 90,
        foco: 'Banco no omoplata. Queixo pra baixo. Squeeze de 1s no topo. Movimento vem do quadril — não hiperestende a lombar.',
        prioridade: true,
        alerta: 'safe',
        imagemUrl: '/exercises/hip-thrust.gif',
      },
      {
        nome: 'Terra Romeno c/ halteres (RDL)',
        series: 4,
        reps: 10,
        repsMin: 10,
        repsMax: 12,
        descanso: 90,
        foco: 'Coluna neutra o tempo todo. Desce até sentir o posterior esticar. Nunca curva a lombar. Começa mais leve do que parece.',
        prioridade: true,
        alerta: 'caution',
        imagemUrl: '/exercises/rdl-halteres.gif',
      },
      {
        nome: 'Leg Curl (Cadeira Flexora)',
        series: 3,
        reps: 12,
        repsMin: 12,
        repsMax: 15,
        descanso: 75,
        foco: 'Joelhos levemente além da borda. Puxa até 90°. Descida controlada em 2–3s.',
        alerta: 'safe',
        imagemUrl: '/exercises/leg-curl.gif',
      },
      {
        nome: 'Glute Kickback — máquina ou cabo',
        series: 3,
        reps: 15,
        repsMin: 15,
        repsMax: 20,
        descanso: 60,
        foco: 'Quadril estável, não rotaciona. Movimento vem do glúteo. Se sentir a lombar compensando, reduz amplitude.',
        prioridade: true,
        alerta: 'safe',
        imagemUrl: '/exercises/glute-kickback.gif',
      },
      {
        nome: 'Abdução — cabo ou máquina',
        series: 3,
        reps: 20,
        repsMin: 20,
        repsMax: 20,
        descanso: 60,
        foco: 'Movimento lateral controlado. Não balança o tronco. Glúteo médio define o shape lateral do quadril.',
        alerta: 'safe',
        imagemUrl: '/exercises/abducao-cabo.gif',
      },
      {
        nome: 'Panturrilha na máquina',
        series: 4,
        reps: 15,
        repsMin: 15,
        repsMax: 20,
        descanso: 45,
        foco: 'Amplitude completa — calcanhar abaixo da plataforma na descida. Pausa de 1s no topo.',
        alerta: 'safe',
        imagemUrl: '/exercises/panturrilha-maquina.gif',
      },
    ],
  },

  // ── TREINO B — Quadríceps + Adutora + Glúteo ──────────────────────────────
  B: {
    nome: 'MMII — Quadríceps + Adutora',
    dia: 'Quarta',
    duracao: 45,
    aquecimento: 'Bicicleta ergométrica 5 min leve + mobilidade de quadril 2 min',
    cor: '#c07830',
    exercicios: [
      {
        nome: 'Leg Press 45° — pés altos e largos',
        series: 4,
        reps: 12,
        repsMin: 10,
        repsMax: 12,
        descanso: 90,
        foco: 'Pés na parte superior da plataforma, abertura maior que ombros. Desce até 90°. Quadril não sai da plataforma.',
        prioridade: true,
        alerta: 'safe',
        imagemUrl: '/exercises/leg-press.gif',
      },
      {
        nome: 'Hack Squat ou Agachamento Smith',
        series: 3,
        reps: 12,
        repsMin: 12,
        repsMax: 12,
        descanso: 90,
        foco: 'No Smith, pés levemente à frente do eixo do quadril. Barra guiada elimina instabilidade que sobrecarrega a lombar.',
        alerta: 'caution',
        imagemUrl: '/exercises/hack-squat.gif',
      },
      {
        nome: 'Cadeira Extensora (Leg Extension)',
        series: 3,
        reps: 15,
        repsMin: 15,
        repsMax: 15,
        descanso: 60,
        foco: 'Joelho alinhado com o eixo da máquina. Extensão completa, pausa 1s no topo. Sem impulso.',
        alerta: 'safe',
        imagemUrl: '/exercises/leg-extension.gif',
      },
      {
        nome: 'Cadeira Adutora',
        series: 3,
        reps: 20,
        repsMin: 20,
        repsMax: 20,
        descanso: 45,
        foco: 'Fecha lento (2s), abre mais lento ainda (3s). Responde a volume e tempo sob tensão, não a carga alta.',
        alerta: 'safe',
        imagemUrl: '/exercises/adutora.gif',
      },
      {
        nome: 'Afundo Reverso c/ halteres',
        series: 3,
        reps: 12,
        repsMin: 12,
        repsMax: 12,
        descanso: 75,
        foco: 'Passo para trás, joelho traseiro quase no chão. Tronco levemente inclinado à frente para recrutar mais glúteo. Core ativo.',
        alerta: 'caution',
        imagemUrl: '/exercises/afundo-reverso.gif',
      },
    ],
  },

  // ── TREINO C — Costas + Bíceps ─────────────────────────────────────────────
  C: {
    nome: 'MMSS — Costas + Bíceps',
    dia: 'Quinta',
    duracao: 45,
    aquecimento: 'Remada leve no cabo 2×15 + rotação de ombro com elástico',
    cor: '#3a7a50',
    exercicios: [
      {
        nome: 'Puxada Frontal (Lat Pulldown)',
        series: 4,
        reps: 12,
        repsMin: 10,
        repsMax: 12,
        descanso: 90,
        foco: 'Pegada um pouco mais larga que os ombros. Puxa para o queixo, cotovelos apontam para o chão. Não joga o tronco para trás.',
        alerta: 'safe',
        imagemUrl: '/exercises/puxada-frontal.gif',
      },
      {
        nome: 'Remada Sentada na Polia',
        series: 4,
        reps: 12,
        repsMin: 12,
        repsMax: 12,
        descanso: 90,
        foco: 'Coluna ereta, não curva a lombar para alcançar mais. Puxa até o abdômen, espreme escápulas por 1s.',
        alerta: 'safe',
        imagemUrl: '/exercises/remada-sentada.gif',
      },
      {
        nome: 'Remada Unilateral c/ halter no banco',
        series: 3,
        reps: 12,
        repsMin: 12,
        repsMax: 12,
        descanso: 75,
        foco: 'Joelho e mão apoiados no banco. Costas paralelas ao chão, coluna neutra. O apoio descarga completamente a lombar.',
        alerta: 'safe',
        imagemUrl: '/exercises/remada-unilateral.gif',
      },
      {
        nome: 'Face Pull no cabo',
        series: 3,
        reps: 15,
        repsMin: 15,
        repsMax: 15,
        descanso: 60,
        foco: 'Corda na altura do rosto. Puxa para a testa, cotovelos para cima e para fora. Essencial para saúde do ombro e postura.',
        alerta: 'safe',
        imagemUrl: '/exercises/face-pull.gif',
      },
      {
        nome: 'Rosca Direta c/ halteres',
        series: 3,
        reps: 12,
        repsMin: 12,
        repsMax: 12,
        descanso: 60,
        foco: 'Cotovelos fixos ao lado do tronco. Supina o punho no topo. Descida em 3s. Se balança o corpo, o peso está pesado.',
        alerta: 'safe',
        imagemUrl: '/exercises/rosca-direta.gif',
      },
      {
        nome: 'Rosca Martelo',
        series: 3,
        reps: 12,
        repsMin: 12,
        repsMax: 12,
        descanso: 60,
        foco: 'Pegada neutra (polegar para cima). Trabalha braquial e braquiorradial além do bíceps. Alternado ou simultâneo.',
        alerta: 'safe',
        imagemUrl: '/exercises/rosca-martelo.gif',
      },
    ],
  },

  // ── TREINO D — Ombro + Tríceps + Core ─────────────────────────────────────
  D: {
    nome: 'MMSS — Ombro + Tríceps + Core',
    dia: 'Sábado',
    duracao: 45,
    aquecimento: 'Rotação externa com elástico 2×15 + elevação lateral leve 1×20',
    cor: '#7F77DD',
    exercicios: [
      {
        nome: 'Desenvolvimento c/ halteres — sentada',
        series: 4,
        reps: 12,
        repsMin: 12,
        repsMax: 12,
        descanso: 90,
        foco: 'Encosto a 90°. Halteres na altura dos ombros, cotovelos a 90°. Não arqueia a lombar — se acontecer, o peso está pesado.',
        alerta: 'caution',
        imagemUrl: '/exercises/desenvolvimento-ombro.gif',
      },
      {
        nome: 'Elevação Lateral c/ halteres',
        series: 4,
        reps: 15,
        repsMin: 15,
        repsMax: 15,
        descanso: 75,
        foco: 'Cotovelo levemente dobrado, eleva até a altura do ombro. Descida lenta em 3s. Peso menor do que parece. Define a largura do ombro.',
        alerta: 'safe',
        imagemUrl: '/exercises/elevacao-lateral.gif',
      },
      {
        nome: 'Elevação Frontal Alternada c/ halter',
        series: 3,
        reps: 12,
        repsMin: 12,
        repsMax: 12,
        descanso: 60,
        foco: 'Eleva um braço de cada vez até a altura dos ombros. Palma para baixo. Sem impulso.',
        alerta: 'safe',
        imagemUrl: '/exercises/elevacao-frontal.gif',
      },
      {
        nome: 'Tríceps Polia (Pushdown) — corda',
        series: 3,
        reps: 15,
        repsMin: 15,
        repsMax: 15,
        descanso: 60,
        foco: 'Cotovelos fixos ao lado do tronco. Estende completamente, separa a corda no final. Não deixa os cotovelos subirem.',
        alerta: 'safe',
        imagemUrl: '/exercises/triceps-polia.gif',
      },
      {
        nome: 'Tríceps Testa c/ halteres (Skull Crusher)',
        series: 3,
        reps: 12,
        repsMin: 12,
        repsMax: 12,
        descanso: 60,
        foco: 'Deitada no banco. Abaixa em direção à testa dobrando os cotovelos. Cotovelos apontam para o teto. Começa leve.',
        alerta: 'safe',
        imagemUrl: '/exercises/triceps-testa.gif',
      },
      {
        nome: 'Dead Bug',
        series: 3,
        reps: 10,
        repsMin: 8,
        repsMax: 10,
        descanso: 60,
        foco: 'Deitada, braços e pernas a 90°. Estende braço + perna opostos mantendo lombar colada no chão. Exercício de core mais seguro para hérnia.',
        alerta: 'safe',
        imagemUrl: '/exercises/dead-bug.gif',
      },
    ],
  },
}

// ─── Semana ───────────────────────────────────────────────────────────────────
export type DiaSemana = {
  label: string
  treino: TreinoKey | null
  tipo: 'treino' | 'pilates' | 'descanso'
}

export const SEMANA: DiaSemana[] = [
  { label: 'Seg', treino: 'A',  tipo: 'treino'   },
  { label: 'Ter', treino: null, tipo: 'pilates'  },
  { label: 'Qua', treino: 'B',  tipo: 'treino'   },
  { label: 'Qui', treino: 'C',  tipo: 'treino'   },
  { label: 'Sex', treino: null, tipo: 'pilates'  },
  { label: 'Sáb', treino: 'D',  tipo: 'treino'   },
  { label: 'Dom', treino: null, tipo: 'descanso' },
]

// ─── Hidratação ───────────────────────────────────────────────────────────────
// Meta diária de água em ml — usada em app/page.tsx e app/hidratacao/page.tsx
export const META_HIDRATACAO_ML = 2800
// ─── Plano Alimentar ─────────────────────────────────────────────────────────
// Formato compatível com app/alimentacao/page.tsx
// PLANO_ALIMENTAR é um Record<string, any> indexado pelo key da Refeicao

export const PLANO_ALIMENTAR: Record<string, {
  horario: string
  meta_proteina: number
  opcoes?: string[]
  carb?: string[]
  proteina?: string[]
  legumes?: string
  extra?: string
}> = {
  cafe_manha: {
    horario: '07:00',
    meta_proteina: 30,
    proteina: ['3 ovos mexidos', '200g iogurte grego', '100g cottage'],
    carb: ['2 fatias pão integral', '1 fruta média'],
    extra: 'Café sem açúcar, quantidade livre',
  },
  lanche_manha: {
    horario: '10:00',
    meta_proteina: 15,
    opcoes: [
      '200g iogurte grego + punhado de castanhas',
      '30g whey + 1 fruta',
      '100g cottage + 1 fruta',
    ],
  },
  almoco: {
    horario: '13:00',
    meta_proteina: 45,
    proteina: ['150g frango grelhado', '150g peixe', '150g carne moída', '2 ovos + 100g atum'],
    carb: ['150g arroz cozido', '200g batata-doce', '150g macarrão integral'],
    legumes: 'Livre — brócolis, abobrinha, cenoura, pepino, tomate',
    extra: 'Marmita batch cooking — montar na prep semanal',
  },
  lanche_tarde: {
    horario: '16:30',
    meta_proteina: 20,
    opcoes: [
      '30g whey + banana',
      '100g atum + torrada integral',
      '200g iogurte grego + mel',
      '2 ovos cozidos + fruta',
    ],
  },
  jantar: {
    horario: '20:00',
    meta_proteina: 40,
    proteina: ['150g salmão', '150g frango', '150g carne', '3 ovos + 100g queijo'],
    carb: ['100g arroz', '150g batata', 'Pode reduzir se não treinou'],
    legumes: 'Livre — priorizar variedade e cor',
    extra: 'Marmita de jantar — preparar junto no batch cooking',
  },
}