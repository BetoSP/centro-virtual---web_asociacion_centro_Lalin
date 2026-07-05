-- Registra el consentimiento explícito de la Política de Privacidad en los
-- formularios que recolectan datos personales identificables (contacto y
-- solicitud de asociación). La suscripción a newsletter no suma esta columna:
-- solo recolecta un email y muestra un aviso informativo, sin checkbox.

alter table mensajes_contacto
  add column accepts_privacy_policy boolean not null default false;

alter table solicitudes_socio
  add column accepts_privacy_policy boolean not null default false;
