export const FICHA_TREINO = {
  A: {
    nome: 'Peito + Bíceps',
    dia: 'Segunda',
    duracao: 45,
    cor: '#7F77DD',
    aquecimento: 'Prancha frontal 20s + prancha lateral 20s cada lado — 2 rounds',
    exercicios: [
      { nome: 'Supino guiado (máquina)', series: 3, reps: 12, descanso: 75, foco: 'Descida 3s, aperte 1s no topo. Pés firmes, lombar não arqueia' },
      { nome: 'Supino inclinado barra', series: 3, reps: 12, descanso: 75, foco: 'Escápulas retraídas. Não force lombar para cima' },
      { nome: 'Crucifixo c/ halteres', series: 3, reps: 15, descanso: 60, foco: 'Arco leve, pico de contração no topo, descida 3s' },
      { nome: 'Rosca direta no cross', series: 3, reps: 15, descanso: 60, foco: 'Supine o punho no topo, segure 1s. Core contraído' },
      { nome: 'Rosca martelo c/ halteres', series: 3, reps: 15, descanso: 60, foco: 'Cotovelo fixo, descida 3s. Preferencialmente sentada' },
    ]
  },
  B: {
    nome: 'MMII — Quadríceps',
    dia: 'Terça',
    duracao: 50,
    cor: '#1D9E75',
    aquecimento: 'Ponte de glúteo 15 reps + abdução deitada c/ elástico 15 reps cada lado',
    exercicios: [
      { nome: 'Leg press 45°', series: 4, reps: 12, descanso: 75, foco: 'Lombar colada no banco, não trave joelho. Principal composto' },
      { nome: 'Hack machine', series: 3, reps: 12, descanso: 75, foco: 'Joelho alinhado com dedão, desça até 90°. Lombar apoiada' },
      { nome: 'Cadeira extensora unilateral', series: 3, reps: 12, descanso: 60, foco: 'Segure 2s no topo — pico de contração no quadríceps' },
      { nome: 'Agachamento sumô c/ halter', series: 3, reps: 15, descanso: 60, foco: 'Halter entre as pernas, pés abertos. Monitorar lombar' },
      { nome: 'Cadeira adutora', series: 3, reps: 20, descanso: 45, foco: 'Controle a volta, não bata a carga' },
    ]
  },
  C: {
    nome: 'Dorsal + Ombro + Tríceps',
    dia: 'Quinta',
    duracao: 48,
    cor: '#D85A30',
    aquecimento: 'Prancha frontal 20s + prancha lateral 20s cada lado — 2 rounds',
    exercicios: [
      { nome: 'Puxada alta aberta anatômica', series: 3, reps: 15, descanso: 75, foco: 'Puxe até o queixo, retrai escápula. Tronco estável' },
      { nome: 'Remada na máquina sentada', series: 3, reps: 15, descanso: 75, foco: 'Peito no apoio, puxe cotovelo para trás. Sem flexão de tronco' },
      { nome: 'Puxada alta articulada', series: 3, reps: 15, descanso: 75, foco: 'Sinta o dorsal, não o bíceps. Tronco estável' },
      { nome: 'Face pull no cross', series: 3, reps: 15, descanso: 60, foco: 'Até altura dos olhos, abra cotovelos. Corrige postura' },
      { nome: 'Elevação lateral c/ halteres', series: 3, reps: 15, descanso: 60, foco: 'Sentada — elimina compensação lombar' },
      { nome: 'Tríceps pulley pronado + supinado', series: 3, reps: 15, descanso: 60, foco: 'Cotovelo fixo, estenda completamente' },
      { nome: 'Tríceps banco', series: 3, reps: 15, descanso: 60, foco: 'Desça até 90° no cotovelo, não arqueie a lombar' },
    ]
  },
  D: {
    nome: 'MMII — Posterior + Glúteo',
    dia: 'Sábado',
    duracao: 50,
    cor: '#D4537E',
    aquecimento: 'Ponte de glúteo 15 reps + abdução deitada c/ elástico 15 reps cada lado',
    exercicios: [
      { nome: 'Elevação pélvica máquina', series: 4, reps: 15, descanso: 60, foco: 'Aperte glúteo no topo, segure 2s. Sem hiperextender lombar' },
      { nome: 'Leg press 45° c/ pés altos', series: 3, reps: 12, descanso: 75, foco: 'Pés no alto da plataforma — foco glúteo e posterior' },
      { nome: 'Cadeira flexora', series: 4, reps: 15, descanso: 60, foco: 'Segure 1s no final, descida 3s' },
      { nome: 'Stiff c/ halteres', series: 3, reps: 12, descanso: 75, foco: 'Quadril para trás, costas neutras. Pare se sentir pressão lombar' },
      { nome: 'Cadeira abdutora', series: 3, reps: 20, descanso: 45, foco: 'Segure 1s no final, controle a volta' },
      { nome: 'Panturrilha sentada', series: 3, reps: 17, descanso: 45, foco: 'Amplitude total — calcanhar abaixo da plataforma' },
    ]
  }
}

export type TreinoKey = keyof typeof FICHA_TREINO

export const SEMANA = [
  { dia: 'Seg', treino: 'A' as TreinoKey, tipo: 'musculacao' },
  { dia: 'Ter', treino: 'B' as TreinoKey, tipo: 'musculacao' },
  { dia: 'Qua', treino: null, tipo: 'pilates' },
  { dia: 'Qui', treino: 'C' as TreinoKey, tipo: 'musculacao' },
  { dia: 'Sex', treino: null, tipo: 'pilates' },
  { dia: 'Sáb', treino: 'D' as TreinoKey, tipo: 'musculacao' },
  { dia: 'Dom', treino: null, tipo: 'descanso' },
]

export const PLANO_ALIMENTAR = {
  cafe_manha: {
    nome: 'Café da manhã — pós-treino',
    horario: '6h–7h',
    emoji: '☀️',
    carb: ['2 fatias pão', 'tapioca 20g', 'aveia 20g', 'cuscuz 60g'],
    proteina: ['2 ovos', 'whey 25g', 'frango desfiado 60g'],
    gordura: ['queijo minas 30g', 'cottage 3 col. sopa', 'creme ricota 3 col. sopa'],
    extra: 'Café + creatina 5g',
    meta_proteina: 20,
  },
  lanche_manha: {
    nome: 'Lanche da manhã',
    horario: '9h–10h',
    emoji: '🍎',
    opcoes: ['nuts 20g + iogurte grego 170g', 'whey 25g + 1 fruta pequena', '2 ovos cozidos + 1 fruta pequena'],
    meta_proteina: 20,
  },
  almoco: {
    nome: 'Almoço',
    horario: '12h–13h',
    emoji: '🍽️',
    carb: ['arroz 90g', 'batata 90g', 'mandioquinha 90g', 'macarrão integral 90g'],
    proteina: ['frango 150g', 'carne 150g', 'peixe 150g'],
    legumes: 'abobrinha / brócolis / cenoura / couve-flor / vagem — 200g',
    gordura: '1 col. chá azeite',
    meta_proteina: 38,
  },
  lanche_tarde: {
    nome: 'Lanche da tarde',
    horario: '15h–16h',
    emoji: '🥤',
    opcoes: [
      'iogurte natural 170g + whey 25g + 1 fruta',
      'iogurte natural 170g + whey 25g + aveia 1 col. sopa',
      '100g açaí sem açúcar + whey 25g',
    ],
    meta_proteina: 22,
  },
  jantar: {
    nome: 'Jantar',
    horario: '19h–20h',
    emoji: '🌙',
    carb: '30–40g',
    proteina: ['frango 150g', 'peixe 150g', 'carne 150g'],
    legumes: '200g+',
    extra: 'Chocolate 70% — 2 quadradinhos (2x/semana)',
    meta_proteina: 38,
  },
}

export const META_HIDRATACAO_ML = 2800
