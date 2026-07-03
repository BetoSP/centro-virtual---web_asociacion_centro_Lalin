import { supabaseAdmin } from '@/lib/supabase';
import { confirmSolicitud } from './actions';

// Confirmación funcional de identidad del solicitante (ver PROJECT_SPEC.md
// §8.2c): sustituye a la firma manuscrita de la solicitud impresa — no es
// verificación biométrica/legal. Este GET solo lee el estado de la
// solicitud; la confirmación en sí requiere el submit explícito del botón
// más abajo (server action en actions.ts), para que abrir el link no alcance
// para confirmar — evita que un escáner de seguridad de email que previsita
// los links de un mensaje confirme la solicitud sin que el solicitante haya
// visto la página.
export default async function ConfirmarSolicitudPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl mb-4">Link inválido</h1>
        <p className="text-sm text-granite">Falta el código de confirmación.</p>
      </main>
    );
  }

  const { data: solicitud } = await supabaseAdmin
    .from('solicitudes_socio')
    .select('id, confirmed_at')
    .eq('confirmation_token', token)
    .maybeSingle();

  if (!solicitud) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl mb-4">Link inválido</h1>
        <p className="text-sm text-granite">No encontramos ninguna solicitud asociada a este link.</p>
      </main>
    );
  }

  if (solicitud.confirmed_at) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl mb-4">¡Solicitud confirmada!</h1>
        <p className="text-sm text-granite">
          Confirmamos tu identidad. La Comisión Directiva se pondrá en contacto para continuar con el trámite.
        </p>
      </main>
    );
  }

  const confirmWithToken = confirmSolicitud.bind(null, token);

  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-display text-2xl mb-4">Confirmá tu solicitud</h1>
      <p className="text-sm text-granite mb-8">
        Para terminar el trámite, confirmá que fuiste vos quien completó la solicitud de asociación.
      </p>
      <form action={confirmWithToken}>
        <button
          type="submit"
          className="rounded-btn bg-gold-2 text-black px-8 py-3 text-sm font-bold shadow-sm hover:bg-gold transition-colors"
        >
          Confirmar solicitud
        </button>
      </form>
    </main>
  );
}
