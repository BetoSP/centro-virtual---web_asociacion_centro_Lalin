import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('suscriptores_newsletter')
      .upsert({ email, activo: true }, { onConflict: 'email' });

    if (error) throw error;

    return NextResponse.json(
      { success: true, message: 'Te has suscrito correctamente' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al procesar tu solicitud' },
      { status: 500 }
    );
  }
}
