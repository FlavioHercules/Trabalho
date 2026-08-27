-- FinanCia schema for PostgreSQL / Supabase
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  currency char(3) not null default 'BRL' check (currency = 'BRL'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  kind text not null default 'expense' check (kind in ('income', 'expense', 'both')),
  color text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, name)
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null check (char_length(trim(title)) between 1 and 120),
  amount_cents bigint not null check (amount_cents > 0),
  type text not null check (type in ('income', 'expense')),
  frequency text not null default 'one_time' check (frequency in ('one_time', 'weekly', 'monthly', 'yearly', 'custom')),
  recurrence_interval smallint check (recurrence_interval is null or recurrence_interval between 1 and 365),
  recurrence_end_on date,
  occurred_on date not null default current_date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Migração segura caso a tabela transactions já exista.
alter table public.transactions add column if not exists frequency text not null default 'one_time';
alter table public.transactions add column if not exists recurrence_interval smallint;
alter table public.transactions add column if not exists recurrence_end_on date;
do $$
begin
  alter table public.transactions drop constraint if exists transactions_frequency_check;
  alter table public.transactions add constraint transactions_frequency_check check (frequency in ('one_time', 'weekly', 'monthly', 'yearly', 'custom'));
end $$;

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 1 and 120),
  target_cents bigint not null check (target_cents > 0),
  current_cents bigint not null default 0 check (current_cents >= 0),
  due_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (current_cents <= target_cents)
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid references public.categories(id) on delete cascade,
  month date not null check (extract(day from month) = 1),
  limit_cents bigint not null check (limit_cents > 0),
  created_at timestamptz not null default now(),
  unique (user_id, category_id, month)
);

create table if not exists public.recurring_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null check (char_length(trim(title)) between 1 and 120),
  amount_cents bigint not null check (amount_cents > 0),
  type text not null default 'expense' check (type in ('income', 'expense')),
  frequency text not null default 'monthly' check (frequency in ('weekly', 'monthly', 'yearly', 'custom')),
  day_of_month smallint not null check (day_of_month between 1 and 31),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.recurring_transactions add column if not exists frequency text not null default 'monthly';
do $$
begin
  alter table public.recurring_transactions drop constraint if exists recurring_transactions_frequency_check;
  alter table public.recurring_transactions add constraint recurring_transactions_frequency_check check (frequency in ('weekly', 'monthly', 'yearly', 'custom'));
end $$;

create table if not exists public.transaction_month_adjustments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  transaction_id uuid not null references public.transactions(id) on delete cascade,
  month date not null check (extract(day from month) = 1),
  multiplier numeric(8,2) not null default 1 check (multiplier >= 0 and multiplier <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (transaction_id, month)
);

alter table public.categories add column if not exists updated_at timestamptz not null default now();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at before update on public.categories for each row execute function public.set_updated_at();
drop trigger if exists transactions_set_updated_at on public.transactions;
create trigger transactions_set_updated_at before update on public.transactions for each row execute function public.set_updated_at();
drop trigger if exists goals_set_updated_at on public.goals;
create trigger goals_set_updated_at before update on public.goals for each row execute function public.set_updated_at();
drop trigger if exists recurring_set_updated_at on public.recurring_transactions;
create trigger recurring_set_updated_at before update on public.recurring_transactions for each row execute function public.set_updated_at();
drop trigger if exists transaction_month_adjustments_set_updated_at on public.transaction_month_adjustments;
create trigger transaction_month_adjustments_set_updated_at before update on public.transaction_month_adjustments for each row execute function public.set_updated_at();

create index if not exists transactions_user_date_idx on public.transactions (user_id, occurred_on desc);
create index if not exists transactions_user_type_idx on public.transactions (user_id, type);
create index if not exists goals_user_idx on public.goals (user_id);
create index if not exists budgets_user_month_idx on public.budgets (user_id, month);
create index if not exists recurring_user_active_idx on public.recurring_transactions (user_id, active);
create index if not exists transaction_month_adjustments_user_month_idx on public.transaction_month_adjustments (user_id, month);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;
alter table public.goals enable row level security;
alter table public.budgets enable row level security;
alter table public.recurring_transactions enable row level security;
alter table public.transaction_month_adjustments enable row level security;

do $$
declare table_name text;
begin
  foreach table_name in array array['categories', 'transactions', 'goals', 'budgets', 'recurring_transactions', 'transaction_month_adjustments'] loop
    execute format('drop policy if exists "Users manage own %1$s" on public.%1$s', table_name);
    execute format('create policy "Users manage own %1$s" on public.%1$s for all using (auth.uid() = user_id) with check (auth.uid() = user_id)', table_name);
  end loop;
end $$;

-- profiles usa o próprio id, por isso precisa de políticas específicas.
drop policy if exists "Users manage own profiles" on public.profiles;
create policy "Users manage own profiles" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);

create or replace view public.monthly_summary with (security_invoker = true) as
select
  user_id,
  date_trunc('month', occurred_on)::date as month,
  coalesce(sum(amount_cents) filter (where type = 'income'), 0) as income_cents,
  coalesce(sum(amount_cents) filter (where type = 'expense'), 0) as expense_cents,
  coalesce(sum(amount_cents) filter (where type = 'income'), 0) - coalesce(sum(amount_cents) filter (where type = 'expense'), 0) as balance_cents
from public.transactions
group by user_id, date_trunc('month', occurred_on)::date;

