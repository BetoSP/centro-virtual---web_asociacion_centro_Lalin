import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // [PENDIENTE: Integración con Supabase para guardar suscriptor]
    // Por ahora retorna success como placeholder
    
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
