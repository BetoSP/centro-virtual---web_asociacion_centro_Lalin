import Eyebrow from '@/components/ui/Eyebrow';
import Avatar from '@/components/ui/Avatar';
import BackLink from '@/components/ui/BackLink';
import type { BoardMember, BoardContent } from '@/types/content';

function MemberRow({ member, avatarBg }: { member: BoardMember; avatarBg?: string }) {
  return (
    <div className="flex gap-4 items-start py-4 border-b border-line last:border-b-0">
      <Avatar name={member.name} gender={member.gender} photo={member.photo} bgColor={avatarBg} />
      <div className="min-w-0 flex-shrink-0 w-40">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold mb-1">
          {member.role}
        </p>
        <h3 className="font-display text-lg mb-1">{member.name}</h3>
        <p className="text-sm text-granite">Mandato {member.term}</p>
      </div>
      <p className="text-sm text-granite italic mt-1 min-w-0">{member.bio ?? '[PENDIENTE: reseña breve]'}</p>
    </div>
  );
}

function BoardGrid({ members, avatarBg }: { members: BoardMember[]; avatarBg?: string }) {
  if (members.length === 0) return null;

  const half = Math.ceil(members.length / 2);
  const columnA = members.slice(0, half);
  const columnB = members.slice(half);

  return (
    <div className="grid gap-x-10 sm:grid-cols-2 mb-6">
      <div>
        {columnA.map((member, index) => (
          <MemberRow key={`${member.role}-a-${index}`} member={member} avatarBg={avatarBg} />
        ))}
      </div>
      <div>
        {columnB.map((member, index) => (
          <MemberRow key={`${member.role}-b-${index}`} member={member} avatarBg={avatarBg} />
        ))}
      </div>
    </div>
  );
}

const LEADERSHIP_ROLES = [
  'Presidente',
  'Vicepresidente',
  'Secretario',
  'Tesorero',
  'Prosecretaria',
  'Protesorera',
  'Secretaria de Actas',
];

export default function Board({ content }: { content: BoardContent }) {
  const leadership = [...content.members]
    .filter((member) => LEADERSHIP_ROLES.includes(member.role))
    .sort((a, b) => LEADERSHIP_ROLES.indexOf(a.role) - LEADERSHIP_ROLES.indexOf(b.role));
  const vocalesTitulares = content.members.filter((member) => member.role === 'Vocal Titular');
  const vocalesSuplentes = content.members.filter((member) => member.role === 'Vocal Suplente');
  const revisores = content.members.filter((member) => member.role.startsWith('Revisor de Cuentas'));
  const directiva = [...leadership, ...vocalesTitulares, ...vocalesSuplentes];

  return (
    <section id="comision-directiva">
      <div className="max-w-container mx-auto px-7 py-20 md:py-28 border-t border-line">
        <BackLink label="← Volver al inicio" fallbackHref="/" />
        <div className="max-w-2xl mb-10">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl mb-2">{content.title}</h2>
          <p className="text-granite leading-7">{content.directivaSubtitle}</p>
        </div>

        <BoardGrid members={directiva} avatarBg="#0E2A38" />

        {revisores.length > 0 && (
          <>
            <h2 className="font-display text-3xl md:text-4xl mb-2 mt-16">{content.revisorsTitle}</h2>
            <p className="text-granite leading-7 max-w-2xl mb-10">{content.revisoraSubtitle}</p>
          </>
        )}
        <BoardGrid members={revisores} avatarBg="#3F6B4A" />
      </div>
    </section>
  );
}
