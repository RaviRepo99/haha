create table if not exists resources_state (
  id text primary key,
  payload jsonb not null
);
