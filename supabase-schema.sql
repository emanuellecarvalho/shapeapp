-- Rodar no Supabase SQL Editor

create table treinos_log (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  data date not null,
  treino_tipo text not null,
  exercicios jsonb not null default '[]',
  duracao_min integer not null default 0,
  observacoes text,
  created_at timestamptz default now()
);

create table alimentacao_log (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  data date not null,
  refeicao text not null,
  itens jsonb not null default '[]',
  proteina_g numeric not null default 0,
  carb_g numeric not null default 0,
  gordura_g numeric not null default 0,
  created_at timestamptz default now()
);

create table hidratacao_log (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  data date not null,
  ml_total integer not null default 0,
  registros jsonb not null default '[]',
  created_at timestamptz default now()
);

create table medidas_log (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  data date not null,
  peso_kg numeric,
  gordura_pct numeric,
  cintura_cm numeric,
  quadril_cm numeric,
  observacoes text,
  created_at timestamptz default now()
);

-- Indexes
create index on treinos_log (user_id, data desc);
create index on alimentacao_log (user_id, data desc);
create index on hidratacao_log (user_id, data desc);
create index on medidas_log (user_id, data desc);
