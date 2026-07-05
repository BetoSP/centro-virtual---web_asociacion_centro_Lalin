import type { ContactPageContent } from '@/types/content';
import { siteConfig } from '@/content/site.config';

export const contactPageContent: ContactPageContent = {
  eyebrow: 'Contacto',
  title: 'Estamos para ayudarte',
  description:
    'Escribinos si querés saber más sobre actividades, asociarte o participar de la comunidad.',
  sideTitle: '¿Tenés una consulta?',
  sideDescription: 'Mandanos un mensaje con tu consulta y te responderemos lo antes posible.',
  emailLabel: 'Email',
  whatsappLabel: 'WhatsApp',
  addressLabel: 'Dirección',
  mapEmbedSrc: `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`,
  form: {
    nameLabel: 'Nombre',
    emailLabel: 'Email',
    messageLabel: 'Mensaje',
    submitLabel: 'Enviar mensaje',
    submitLoadingLabel: 'Enviando...',
    successMessage: '¡Gracias! Recibimos tu mensaje y te responderemos a la brevedad.',
    errorMessage: 'Hubo un error al enviar tu mensaje. Intentá nuevamente.',
    privacyConsentLabel: 'Leí y acepto la Política de Privacidad para el tratamiento de mis datos.',
  },
};
