import { Resend } from 'resend';

// Destino y remitente configurables por entorno (no hardcodeados) para que un
// administrador los pueda definir sin tocar código — ver .env.local.
// Mientras no haya un dominio propio verificado en Resend, EMAIL_FROM debe
// quedar en el dominio de pruebas onboarding@resend.dev, que en modo sandbox
// solo puede enviar a la dirección dueña de la cuenta de Resend.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';
const NOTIFICATION_EMAIL = process.env.CONTACT_NOTIFICATION_EMAIL;

// Envío de notificaciones best-effort: si no está configurado (falta API key
// o dirección de destino) o falla el envío, no debe romper el flujo del
// formulario — los datos ya quedaron persistidos en Supabase, que es la
// fuente de verdad.
export async function sendNotificationEmail(subject: string, text: string) {
  if (!resend || !NOTIFICATION_EMAIL) return;

  try {
    await resend.emails.send({ from: FROM, to: NOTIFICATION_EMAIL, subject, text });
  } catch (error) {
    console.error('Error al enviar email de notificación:', error);
  }
}
