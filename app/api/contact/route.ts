import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
    }

    // [PENDIENTE: Integración con Supabase/servicio de email para guardar y notificar este
    // mensaje de contacto a la institución. Requiere decisión de base de datos/email — con costo.]
    console.log('Nuevo mensaje de contacto:', { name, email, message });

    return NextResponse.json({ success: true, message: 'Mensaje recibido correctamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al procesar tu mensaje' }, { status: 500 });
  }
}
