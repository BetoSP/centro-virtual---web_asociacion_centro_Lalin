-- Confirmación funcional de identidad del solicitante de asociación (no
-- legal/biométrica — ver doc/PROJECT_SPEC.md §8.2 y §8.2c). Sustituye a la
-- firma manuscrita de la solicitud impresa: mientras confirmed_at sea null,
-- la solicitud queda "sujeta a verificación de identidad".
alter table solicitudes_socio
  add column confirmation_token uuid not null default gen_random_uuid(),
  add column confirmed_at timestamptz,
  add column confirmation_method text
    check (confirmation_method in ('email', 'whatsapp'));

comment on column solicitudes_socio.confirmation_token is
  'Token opaco enviado por email al solicitante para que confirme su solicitud (ver app/asociate/confirmar).';
comment on column solicitudes_socio.confirmed_at is
  'Null hasta que el solicitante confirma por email (automático) o por WhatsApp (marcado manualmente por la institución al recibir el mensaje). "Sujeta a verificación de identidad" mientras sea null.';
comment on column solicitudes_socio.confirmation_method is
  'Canal por el que se confirmó: email (automático vía token) o whatsapp (manual).';
