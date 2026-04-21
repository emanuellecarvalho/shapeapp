import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { dados } = await req.json()

    const systemPrompt = `Você é uma coach fitness especializada em recomposição corporal feminina. 
Analise os dados de treino, alimentação, hidratação e medidas da usuária e forneça insights detalhados e motivadores.
A usuária tem as seguintes características:
- Objetivo: recomposição corporal, shape atlético com definição muscular
- Treina musculação 4x/semana às 5h em jejum (treinos A/B/C/D)
- Pilates 2x/semana (quartas e sextas)
- Trabalha home office
- Histórico de hérnias de disco lombares (em tratamento, sem dor irradiada)
- Menos de 20% de gordura corporal atual
- Já perdeu ~10kg e está em fase de refinamento
- Dorme às 20h/20h30 e acorda às 4h

Seja específica, use os números reais da usuária, compare com metas e dê sugestões práticas.
Responda em português do Brasil, de forma calorosa mas direta.
Formate com seções claras usando markdown.`

    const userPrompt = `Analise meus dados dos últimos 7 dias e me dê insights detalhados de evolução:

${JSON.stringify(dados, null, 2)}

Por favor analise:
1. **Consistência de treinos** — quantos treinos completei, grupos musculares, evolução de carga
2. **Nutrição** — média de proteína diária vs meta (130-150g/dia), padrões de refeições
3. **Hidratação** — média diária vs meta de 2,8L
4. **Progresso físico** — se houver medidas registradas
5. **Pontos fortes desta semana**
6. **O que ajustar para acelerar os resultados**
7. **Previsão motivadora** — com base na consistência atual, quando pode esperar ver mais definição muscular`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!response.ok) {
      throw new Error('Erro na API do Claude')
    }

    const data = await response.json()
    const insight = data.content[0]?.text || 'Sem dados suficientes para análise.'

    return NextResponse.json({ insight })
  } catch (error) {
    console.error('Erro Claude API:', error)
    return NextResponse.json({ error: 'Erro ao gerar insights' }, { status: 500 })
  }
}
