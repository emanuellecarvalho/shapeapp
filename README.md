# ShapeApp

PWA de recomposição corporal — Next.js + Supabase + Claude AI

## Stack
- Next.js 14 (App Router) + Tailwind CSS
- Supabase (banco PostgreSQL)
- Claude AI (insights personalizados)
- Vercel (deploy)

## Setup

### 1. Instalar
```bash
npm install
```

### 2. Supabase
1. Crie conta em supabase.com
2. Novo projeto
3. SQL Editor → rode o arquivo `supabase-schema.sql`
4. Settings → API → copie URL e anon key

### 3. Claude API
1. console.anthropic.com → crie API key

### 4. .env.local
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
ANTHROPIC_API_KEY=sk-ant-api03-...
```

### 5. Rodar local
```bash
npm run dev
# http://localhost:3000
```

## Deploy Vercel

```bash
# Via GitHub (recomendado)
git init && git add . && git commit -m "init"
git remote add origin https://github.com/seu-usuario/shapeapp.git
git push -u origin main
# Depois: vercel.com → New Project → selecione o repo → adicione as env vars → Deploy
```

## Instalar como PWA

**iPhone (Safari):** Compartilhar → Adicionar à Tela de Início

**Android (Chrome):** Menu (3 pontos) → Adicionar à tela inicial

## Estrutura
```
app/
  page.tsx              # Dashboard
  treino/page.tsx       # Ficha + timer de descanso
  alimentacao/page.tsx  # Registro de refeições + macros
  hidratacao/page.tsx   # Controle de água
  perfil/page.tsx       # Medidas corporais
  insights/page.tsx     # Análise Claude AI
  api/claude/route.ts   # API route Claude
components/layout/BottomNav.tsx
lib/dados.ts            # Ficha de treino + plano alimentar
lib/supabase.ts
supabase-schema.sql     # SQL das tabelas
```

## V2 — próximas features
- Autenticação (Supabase Auth)
- Gráficos de evolução de carga
- Notificações de hidratação
- Chat com Claude
- Histórico fotográfico
