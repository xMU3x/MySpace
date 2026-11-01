-- شغّله مرة واحدة في Supabase > SQL Editor (مشروع MySpace)
create table if not exists public.records (
  id         text primary key,
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  kind       text not null,                -- sim | line | cat | item | ent | sec
  data       jsonb not null default '{}',
  deleted    boolean not null default false,
  updated_at timestamptz not null default now()
);
create index if not exists records_user_upd on public.records(user_id, updated_at);
alter table public.records enable row level security;
create policy "own rows" on public.records for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create or replace function public.touch() returns trigger language plpgsql as
$$ begin new.updated_at := now(); return new; end $$;
create trigger records_touch before insert or update on public.records
  for each row execute function public.touch();
