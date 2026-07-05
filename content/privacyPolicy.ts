import type { PrivacyPolicyContent } from '@/types/content';
import { siteConfig } from '@/content/site.config';

// Texto legal en borrador, redactado a partir de modelos estándar de política
// de privacidad conformes a la Ley 25.326 de Protección de Datos Personales
// (Argentina). Pendiente de revisión por un asesor legal antes de considerarse
// definitivo — ver los bloques [PENDIENTE: ...], que dependen de datos propios
// de la institución que hoy no están confirmados (personería jurídica, si
// existe un responsable de datos designado, plazo de conservación exacto).
export const privacyPolicyContent: PrivacyPolicyContent = {
  eyebrow: 'Legales',
  title: 'Política de Privacidad',
  lastUpdated: 'Última actualización: julio de 2026',
  intro:
    `${siteConfig.name} (en adelante, "el Centro") respeta la privacidad de las personas que visitan este sitio, se ponen en contacto, se suscriben a novedades o solicitan asociarse. Esta política explica qué datos personales recopilamos, con qué finalidad, cómo los protegemos y qué derechos tenés sobre ellos, conforme a la Ley N.º 25.326 de Protección de Datos Personales de la República Argentina y sus normas reglamentarias.`,
  sections: [
    {
      heading: '1. Responsable del tratamiento',
      paragraphs: [
        `El responsable del tratamiento de tus datos personales es ${siteConfig.name}, con domicilio en ${siteConfig.address}. Podés contactarnos por email a ${siteConfig.email} o ${siteConfig.infoEmail}, o por WhatsApp al ${siteConfig.whatsapp} ante cualquier consulta relacionada con esta política.`,
        '[PENDIENTE: consignar CUIT y número de personería jurídica de la institución. Este dato debe cargarlo el administrador del sitio; a futuro será un campo configurable desde el panel de administración del Portal Galicia Migrante.]',
        '[PENDIENTE: indicar si existe una persona u oficina designada como responsable interno del tratamiento de datos (encargado/oficial de protección de datos), o si esa función la ejerce directamente la Comisión Directiva.]',
      ],
    },
    {
      heading: '2. Qué datos recopilamos',
      paragraphs: [
        'Recopilamos únicamente los datos que nos proporcionás voluntariamente al usar los formularios de este sitio:',
        '• Formulario de contacto: nombre, email y el contenido de tu mensaje.',
        '• Suscripción a novedades: dirección de email.',
        '• Solicitud de asociación: nombre y apellido, tipo y número de documento, fecha y lugar de nacimiento, estado civil, domicilio, teléfono, email, datos de origen gallego, datos del socio que te presenta (si corresponde) y una fotografía tomada en el momento con la cámara del dispositivo, que se usa como confirmación funcional de identidad en reemplazo de la firma manuscrita de la solicitud impresa.',
        'No recopilamos datos de navegación con fines de seguimiento publicitario ni utilizamos cookies propias de analítica o marketing (ver sección 8, "Cookies").',
      ],
    },
    {
      heading: '3. Finalidad del tratamiento',
      paragraphs: [
        'Usamos tus datos exclusivamente para:',
        '• Responder tus consultas enviadas por el formulario de contacto.',
        '• Enviarte novedades del Centro, si te suscribiste voluntariamente (podés darte de baja en cualquier momento).',
        '• Procesar tu solicitud de asociación: evaluación por la Comisión Directiva, confirmación de identidad, y —si tu solicitud es aprobada— gestión de tu legajo como socio.',
        'No utilizamos tus datos para ninguna finalidad distinta a la informada, ni los usamos para tomar decisiones automatizadas que te afecten.',
      ],
    },
    {
      heading: '4. Base legal y consentimiento',
      paragraphs: [
        'El tratamiento de tus datos se basa en tu consentimiento libre, expreso e informado, otorgado al marcar la casilla de aceptación correspondiente antes de enviar cada formulario. Podés retirar tu consentimiento en cualquier momento, sin que ello afecte la licitud del tratamiento realizado con anterioridad a su retiro (ver sección 7, "Tus derechos").',
      ],
    },
    {
      heading: '5. Con quién compartimos tus datos',
      paragraphs: [
        'No vendemos, alquilamos ni compartimos tus datos personales con terceros con fines comerciales. Sí utilizamos los siguientes proveedores como encargados del tratamiento, exclusivamente para operar el sitio:',
        '• Supabase (alojamiento de base de datos y almacenamiento de archivos): guarda los datos enviados por los formularios y, en el caso de la solicitud de asociación, la fotografía de verificación en un depósito privado no accesible públicamente.',
        '• Resend (envío de correo electrónico): utilizado para notificar a la institución sobre nuevos mensajes/solicitudes y para enviarte el email de confirmación de tu solicitud de asociación.',
        'Estos proveedores procesan los datos únicamente por nuestra cuenta y bajo nuestras instrucciones, y no están autorizados a usarlos para fines propios.',
        '[PENDIENTE: confirmar si Supabase y/o Resend almacenan datos en servidores fuera de la República Argentina y, de ser así, incluir la cláusula de transferencia internacional de datos que exige la Ley 25.326 (art. 12).]',
      ],
    },
    {
      heading: '6. Plazo de conservación',
      paragraphs: [
        'Conservamos tus datos solo durante el tiempo necesario para cumplir con la finalidad para la que fueron recolectados: los mensajes de contacto y las solicitudes de asociación no aprobadas se conservan hasta 24 meses desde su recepción; los datos de socios activos se conservan mientras dure el vínculo asociativo; podés solicitar la baja de la suscripción a novedades en cualquier momento, lo que elimina tu email de esa lista de forma inmediata.',
        '[PENDIENTE: estos plazos son una propuesta de borrador sujeta a confirmación por la Comisión Directiva y revisión legal — no son todavía una política institucional definitiva. A futuro deberían ser un parámetro configurable desde el panel de administración del Portal Galicia Migrante, no un valor fijo en el código.]',
      ],
    },
    {
      heading: '7. Tus derechos',
      paragraphs: [
        'Como titular de tus datos, la Ley 25.326 te reconoce el derecho a acceder, rectificar, actualizar y suprimir tus datos personales (derechos ARCO), así como a solicitar información sobre las finalidades de su tratamiento. Podés ejercer estos derechos escribiéndonos a cualquiera de los emails de contacto indicados en la sección 1.',
        'La Agencia de Acceso a la Información Pública, en su carácter de Autoridad de Control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales.',
      ],
    },
    {
      heading: '8. Cookies',
      paragraphs: [
        'Este sitio no utiliza cookies propias de analítica, publicidad o seguimiento. El mapa incorporado en la página de contacto es un servicio de terceros (Google Maps) que puede utilizar sus propias cookies conforme a su política de privacidad, ajena a nuestro control.',
        'Si en el futuro se incorporan herramientas de analítica o marketing que utilicen cookies, esta política se actualizará y se solicitará el consentimiento correspondiente antes de activarlas.',
      ],
    },
    {
      heading: '9. Seguridad de la información',
      paragraphs: [
        'Adoptamos medidas técnicas y organizativas razonables para proteger tus datos: la fotografía de verificación y el resto de los datos de las solicitudes se almacenan en una base de datos con acceso restringido (no accesible públicamente ni desde el navegador), las comunicaciones con el sitio viajan cifradas (HTTPS), y las credenciales de acceso a los sistemas de almacenamiento solo están disponibles para el personal técnico autorizado.',
        'Ninguna medida de seguridad es infalible. Ante cualquier incidente que pudiera afectar tus datos, nos comprometemos a notificarlo a la Agencia de Acceso a la Información Pública y, cuando corresponda, a las personas afectadas, conforme a la normativa vigente.',
      ],
    },
    {
      heading: '10. Menores de edad',
      paragraphs: [
        'Los formularios de este sitio están dirigidos a personas mayores de edad. La solicitud de asociación de menores debe ser realizada por su representante legal.',
      ],
    },
    {
      heading: '11. Cambios a esta política',
      paragraphs: [
        'Podemos actualizar esta política para reflejar cambios en nuestras prácticas o en la normativa aplicable. La fecha de la última actualización figura al comienzo de este documento.',
      ],
    },
  ],
};
