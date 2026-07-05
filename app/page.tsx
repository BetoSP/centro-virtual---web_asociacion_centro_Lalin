import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionDivider from '@/components/ui/SectionDivider';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Activities from '@/components/sections/Activities';
import ComarcaNews from '@/components/sections/ComarcaNews';
import News from '@/components/sections/News';
import JoinUs from '@/components/sections/JoinUs';
import BoardTeaser from '@/components/sections/BoardTeaser';
import Contact from '@/components/sections/Contact';
import { getHomeContent } from '@/lib/microsite-data';

export default function Home() {
  const homeContent = getHomeContent();

  return (
    <>
      <Header />
      <Hero content={homeContent.hero} />
      <SectionDivider />
      <About content={homeContent.about} />
      <SectionDivider />
      <Activities content={homeContent.activities} />
      <ComarcaNews content={homeContent.comarcaNews} />
      <News content={homeContent.news} />
      <BoardTeaser content={homeContent.boardTeaser} />
      <JoinUs content={homeContent.joinUs} />
      <Contact content={homeContent.contact} />
      <Footer />
    </>
  );
}
