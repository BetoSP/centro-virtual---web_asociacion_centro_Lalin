import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendNotificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('mensajes_contacto')
      .insert({ nombre: name, email, mensaje: message });

    if (error) throw error;

    await sendNotificationEmail(
      'Nuevo mensaje de contacto',
      `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
    );

    return NextResponse.json({ success: true, message: 'Mensaje recibido correctamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al procesar tu mensaje' }, { status: 500 });
  }
}
