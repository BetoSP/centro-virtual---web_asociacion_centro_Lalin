import { createClient } from '@supabase/supabase-js';

// Cliente de servidor con service_role key (bypassea RLS). Las tablas de
// Fase 1 no tienen policies públicas: todo el acceso pasa por acá, nunca
// por el cliente del navegador. No importar este módulo desde código con
// 'use client'.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
