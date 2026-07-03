'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';

// Requiere un submit explícito del solicitante (ver page.tsx): a diferencia
// de mutar en el render de un GET, esto no puede dispararse por un escáner
// de seguridad de email que previsita los links de un mensaje.
export async function confirmSolicitud(token: string) {
  await supabaseAdmin
    .from('solicitudes_socio')
    .update({ confirmed_at: new Date().toISOString(), confirmation_method: 'email' })
    .eq('confirmation_token', token)
    .is('confirmed_at', null);

  revalidatePath('/asociate/confirmar');
}
