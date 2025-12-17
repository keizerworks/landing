import HeroSection from "~/components/hero";
import { gotham_font, spaceGrotesk } from "~/config/font";
import FooterSection from "~/components/footer";

export default function Home() {
  return (
    <main
      className={`${gotham_font.variable} ${spaceGrotesk.variable} overflow-hidden bg-white`}
    >
      <HeroSection />
      <FooterSection /> 
    </main>
  );
}
