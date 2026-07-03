import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';
import { sendNotificationEmail } from '@/lib/email';

const PHOTO_BUCKET = 'solicitudes-socio-fotos';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.firstName || !data.lastName || !data.documentNumber || !data.email || !data.photo) {
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

    const { error: insertError } = await supabaseAdmin.from('solicitudes_socio').insert({
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
    });

    if (insertError) throw insertError;

    await sendNotificationEmail(
      'Nueva solicitud de asociación',
      `Nombre: ${data.firstName} ${data.lastName}\nDocumento: ${data.documentType || ''} ${data.documentNumber}\nEmail: ${data.email}\nTeléfono: ${data.mobilePhone || data.phone || ''}\n\nLa categoría de socio y el número de socio se completan manualmente por la institución (ver PROJECT_SPEC.md §8.2b).`
    );
    // [PENDIENTE: Verificación de identidad contra RENAPER (reconocimiento facial) con la foto
    // capturada, que sustituye a la firma del solicitante. Requiere convenio/acceso oficial a la
    // API de RENAPER — no implementado hasta contar con esas credenciales.]
    // [PENDIENTE: Si se indicó un socio que presenta (referrerName/referrerMemberNumber), buscar
    // el contacto real de ese socio (por número de socio, no el que tipee el solicitante) y
    // enviarle un mail o WhatsApp solicitando que avale la presentación. Requiere (1) una base de
    // socios con contacto real, que todavía no existe, y (2) un servicio de email o WhatsApp
    // Business API contratado — decisiones a confirmar antes de implementar esto.]

    return NextResponse.json(
      { success: true, message: 'Solicitud recibida correctamente' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al procesar tu solicitud' },
      { status: 500 }
    );
  }
}
