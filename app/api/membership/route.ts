import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.firstName || !data.lastName || !data.documentNumber || !data.email || !data.photo) {
      return NextResponse.json(
        { error: 'Faltan datos obligatorios' },
        { status: 400 }
      );
    }

    // [PENDIENTE: Integración con Supabase/servicio de email para guardar y notificar la solicitud
    // a la Comisión Directiva. La categoría de socio y el número de socio se completan
    // manualmente por la institución a partir de esta solicitud.]
    // [PENDIENTE: Verificación de identidad contra RENAPER (reconocimiento facial) con la foto
    // capturada, que sustituye a la firma del solicitante. Requiere convenio/acceso oficial a la
    // API de RENAPER — no implementado hasta contar con esas credenciales.]
    // [PENDIENTE: Si se indicó un socio que presenta (referrerName/referrerMemberNumber), buscar
    // el contacto real de ese socio en la base de datos de la institución (por número de socio,
    // no el que tipee el solicitante) y enviarle un mail o WhatsApp solicitando que avale la
    // presentación. Requiere: (1) una base de datos de socios con sus datos de contacto, que
    // todavía no existe, y (2) un servicio de email o WhatsApp Business API contratado —
    // decisiones a confirmar antes de implementar esto.]
    console.log('Nueva solicitud de socio:', { ...data, photo: '[omitido en log]' });

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
