import HeroSection from "~/components/hero";
import ClientSection from "~/components/clients";
import ProjectSection from "~/components/projects";
import StrategySection from "~/components/strategy";
import NewsSection from "~/components/news";
import AboutSection from "~/components/about";
import ContactSection from "~/components/contact";
import NewsLetter from "~/components/newsletter";
import FAQ from "~/components/faq";
import { gotham_font, spaceGrotesk } from "~/config/font";
import WhyKeizer from "~/components/why-keizer";

export default function Home() {
  return (
    <main
      className={`${gotham_font.variable} ${spaceGrotesk.variable} bg-black`}
    >
      <HeroSection />
      <WhyKeizer />
      <ProjectSection />
      <StrategySection />
      <NewsSection />
      <AboutSection />
      <ContactSection />
      <FAQ />
      <NewsLetter />
    </main>
  );
}
