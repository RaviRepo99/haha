alter table if exists public.resources_state enable row level security;

drop policy if exists "Public read resources state" on public.resources_state;
drop policy if exists "Public insert resources state" on public.resources_state;
drop policy if exists "Public update resources state" on public.resources_state;
drop policy if exists "Public delete resources state" on public.resources_state;

create policy "Public read resources state"
on public.resources_state
for select
to public
using (true);

create policy "Public insert resources state"
on public.resources_state
for insert
to public
with check (true);

create policy "Public update resources state"
on public.resources_state
for update
to public
using (true)
with check (true);

create policy "Public delete resources state"
on public.resources_state
for delete
to public
using (true);
