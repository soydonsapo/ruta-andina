create table public.expedition_reservations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(btrim(full_name)) between 2 and 120),
  email text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text not null check (char_length(btrim(phone)) between 5 and 40),
  estimated_date date not null,
  expedition_id text not null check (
    expedition_id in ('salkantay', 'sajama', 'titicaca', 'luribay', 'torotoro')
  ),
  requirements text check (char_length(requirements) <= 2000),
  created_at timestamptz not null default now()
);

alter table public.expedition_reservations enable row level security;

revoke all on table public.expedition_reservations from anon, authenticated;
grant insert on table public.expedition_reservations to anon, authenticated;

create policy "Public visitors can submit expedition reservations"
  on public.expedition_reservations
  for insert
  to anon, authenticated
  with check (true);
