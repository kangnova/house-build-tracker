-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Table: TRANSACTIONS
create table public.transactions (
  id uuid primary key default uuid_generate_v4(),
  date date not null,
  amount numeric not null,
  category text not null check (category in ('MATERIAL', 'LABOR', 'OTHER')),
  category_id text, -- For custom categories link
  description text,
  store_name text,
  store_address text,
  store_phone text,
  created_at timestamp with time zone default now()
);

-- 2. Table: LABOR (Workers)
create table public.labor (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text check (role in ('TUKANG', 'LADEN')),
  daily_wage numeric not null,
  created_at timestamp with time zone default now()
);

-- 3. Table: CATEGORIES
create table public.categories (
  id text primary key, -- e.g. 'cat-material'
  name text not null,
  type text check (type in ('SYSTEM', 'CUSTOM')),
  created_at timestamp with time zone default now()
);

-- 4. Table: BUDGET
create table public.budget (
  id serial primary key,
  total numeric not null default 0,
  plan_material numeric not null default 0,
  plan_labor numeric not null default 0,
  plan_other numeric not null default 0,
  updated_at timestamp with time zone default now()
);

-- Seed Initial Data
insert into public.categories (id, name, type) values
('cat-material', 'Material Bangunan', 'SYSTEM'),
('cat-labor', 'Upah Tukang', 'SYSTEM'),
('cat-snack', 'Konsumsi (Snack/Makan)', 'CUSTOM'),
('cat-tools', 'Sewa Alat', 'CUSTOM'),
('cat-other', 'Lain-lain', 'CUSTOM')
on conflict (id) do nothing;

insert into public.budget (id, total, plan_material, plan_labor, plan_other)
values (1, 100000000, 60000000, 30000000, 10000000)
on conflict (id) do nothing;

-- Enable Row Level Security (RLS) - Optional for now, but good practice
alter table public.transactions enable row level security;
alter table public.labor enable row level security;
alter table public.categories enable row level security;
alter table public.budget enable row level security;

-- Create Policy: Allow Public Read/Write (since we use anonymous key for MVP)
-- In production, you'd want authenticated users only.
create policy "Allow public access" on public.transactions for all using (true);
create policy "Allow public access" on public.labor for all using (true);
create policy "Allow public access" on public.categories for all using (true);
create policy "Allow public access" on public.budget for all using (true);
