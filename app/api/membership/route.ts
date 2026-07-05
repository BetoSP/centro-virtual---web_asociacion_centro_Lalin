import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';
import { sendNotificationEmail, sendApplicantConfirmationEmail } from '@/lib/email';
import { whatsappHref } from '@/lib/whatsapp';
import { getSiteConfig, getMembershipFormContent } from '@/lib/microsite-data';

const PHOTO_BUCKET = 'solicitudes-socio-fotos';
// [PENDIENTE: dominio real — hoy se usa NEXT_PUBLIC_SITE_URL o un placeholder hasta contratar]
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://centro-lalin-agolada-silleda.example';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (
      !data.firstName ||
      !data.lastName ||
      !data.documentNumber ||
      !data.email ||
      !data.photo ||
      data.acceptsPrivacyPolicy !== 'on'
    ) {
      return NextResponse.json(
        { error: 'Faltan datos obligatorios' },
        { status: 400 }
      );
    }

    // La foto llega como Data URL base64 (ver components/forms/PhotoCapture.tsx).
    // Se sube al bucket privado y se guarda solo el path — no una URL pública —
    // porque la foto de verificación es un dato sensible (PROJECT_SPEC.md §8.3).
    const matches = /^data:(image\/\w+);base64,(.+)$/.exec(data.photo);
    if (!matches) {
      return NextResponse.json({ error: 'Formato de foto inválido' }, { status: 400 });
    }
    const [, , base64Body] = matches;
    const photoBuffer = Buffer.from(base64Body, 'base64');
    const photoPath = `${randomUUID()}.jpg`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(PHOTO_BUCKET)
      .upload(photoPath, photoBuffer, { contentType: 'image/jpeg' });

    if (uploadError) throw uploadError;

    const { data: inserted, error: insertError } = await supabaseAdmin.from('solicitudes_socio').insert({
      first_name: data.firstName,
      last_name: data.lastName,
      document_type: data.documentType,
      document_number: data.documentNumber,
      marital_status: data.maritalStatus || null,
      spouse_name: data.spouseName || null,
      children: data.children || null,
      profession: data.profession || null,
      street: data.street,
      street_number: data.streetNumber || null,
      floor: data.floor || null,
      apartment: data.apartment || null,
      locality: data.locality,
      postal_code: data.postalCode || null,
      phone: data.phone || null,
      mobile_phone: data.mobilePhone || null,
      email: data.email,
      birth_date: data.birthDate,
      birth_country: data.birthCountry,
      birth_province: data.birthProvince || null,
      birth_concello: data.birthConcello || null,
      birth_locality: data.birthLocality || null,
      galician_origin: data.galicianOrigin || null,
      spanish_registration: data.spanishRegistration || null,
      referrer_name: data.referrerName || null,
      referrer_member_number: data.referrerMemberNumber || null,
      photo_url: photoPath,
      accepts_statutes: data.acceptsStatutes === 'on',
      accepts_privacy_policy: true,
    }).select('id, confirmation_token').single();

    if (insertError) {
      // La foto ya se subió al bucket antes del insert (necesitamos el path
      // final antes de poder insertar la fila) — si el insert falla, hay que
      // borrarla para no dejar archivos huérfanos en Storage.
      await supabaseAdmin.storage.from(PHOTO_BUCKET).remove([photoPath]);
      throw insertError;
    }

    await sendNotificationEmail(
      'Nueva solicitud de asociación',
      `Nombre: ${data.firstName} ${data.lastName}\nDocumento: ${data.documentType || ''} ${data.documentNumber}\nEmail: ${data.email}\nTeléfono: ${data.mobilePhone || data.phone || ''}\n\nLa categoría de socio y el número de socio se completan manualmente por la institución (ver PROJECT_SPEC.md §8.2b). La solicitud queda "sujeta a verificación de identidad" hasta que el solicitante confirme por mail o WhatsApp (ver PROJECT_SPEC.md §8.2c).`
    );

    // Confirmación funcional de identidad (sustituye a la firma manuscrita de
    // la solicitud impresa — ver PROJECT_SPEC.md §8.2c). No es verificación
    // biométrica/legal: confirma que quien completó el formulario controla el
    // mail o el WhatsApp indicado.
    const confirmUrl = `${BASE_URL}/asociate/confirmar?token=${inserted.confirmation_token}`;
    await sendApplicantConfirmationEmail(data.email, confirmUrl);

    const code = inserted.id.slice(0, 8);
    const whatsappMessage = getMembershipFormContent().confirmWhatsappMessageTemplate.replace(
      '{code}',
      code
    );
    const whatsappConfirmUrl = whatsappHref(getSiteConfig().whatsapp, whatsappMessage);

    // [PENDIENTE: Si se indicó un socio que presenta (referrerName/referrerMemberNumber), que ese
    // socio confirme que conoce y avala al solicitante sería confirmación suficiente por sí sola.
    // No implementado: requiere un padrón de socios con contacto real (cada asociación deberá
    // cargar el suyo para poder usar el sistema), que todavía no existe en este repo — es
    // funcionalidad de Fase 2 / Portal (ver PROJECT_SPEC.md §4.6, Hito b).]

    return NextResponse.json(
      { success: true, message: 'Solicitud recibida correctamente', whatsappConfirmUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST /api/membership failed:', error);
    return NextResponse.json(
      { error: 'Error al procesar tu solicitud' },
      { status: 500 }
    );
  }
}
