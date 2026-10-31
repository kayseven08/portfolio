create table if not exists portfolio_data (
  id string primary key,
  content jsonb not null default '{}'::jsonb,
  updated_by uuid,
  updated_at timestamptz not null default now()
);

create table if not exists portfolio_users (
  id uuid primary key default gen_random_uuid(),
  email string unique not null,
  password_hash string not null,
  created_at timestamptz not null default now()
);

create table if not exists portfolio_sessions (
  token_hash string primary key,
  user_id uuid not null references portfolio_users(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_sessions_expiry_idx on portfolio_sessions (expires_at);

insert into portfolio_data (id, content) values ('main', '{}'::jsonb)
on conflict (id) do nothing;
