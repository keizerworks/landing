import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div
      id="hero"
      className="h-auto overflow-hidden relative w-full bg-primary"
    >
      <div className="mx-auto max-w-[1536px]">
        <div className="dot-grid " />
        <div className="md:pt-[138px] pt-[138px]">
          <div className="relative">
            <img
              className="absolute z-[0] md:block hidden top-[68%] -right-[3%] scale-[1.05] -translate-y-1/2"
              src="/assets/decoration/decoration-text.svg"
              alt="decoration"
            />
            <div className="w-fit md:relative md:block hidden">
              <Image
                src="/assets/keizer-hero-image.webp"
                height={560}
                width={875}
                alt="keizer-hero-image"
                priority
                unoptimized
              />

              <div
                className="absolute inset-0 right-[0.39%] bg-gradient-to-l md:from-[#161619] lg:from-[#161619]/70 to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            <div className="md:absolute p-[20px] md:top-[50%] md:-translate-y-1/2 md:right-[10px] lg:right-[190px]">
              <h1
                data-duration="1"
                className="lg:text-8xl fade-in-blur-0 md:text-6xl sm:text-5xl text-4xl md:ml-[8px] group translate-y-1 font-bold leading-tight capitalize"
              >
                Unleashing
                <br className="md:hidden block" />
                <span className="md:block inline-block text-black relative">
                  Creativity Across
                  <img
                    className="absolute group-hover:rotate-[2deg] top-0 left-0 w-full transition-all z-[-1]"
                    src="/assets/decoration/hero-h1-rectangle.svg"
                    alt="image-h1-background"
                  />
                </span>
                <br className="md:hidden block" />
                Digital platforms
              </h1>

              <p className="mt-[35px] fade-in-blur-1 translate-y-2 font-mono [word-spacing:4px] font-normal opacity-65 lg:leading-[30px] md:leading-[18px] leading-[20px] lg:text-[19px] md:text-[17px] text-[15px] md:w-[500px] lg:w-[800px]">
                From stunning websites to immersive games and motion graphics,
                we bring your vision to life with cutting-edge design and
                development.
              </p>

              <Link
                href="#contact"
                className="pt-[30px] md:translate-y-4 fade-in-blur-2 md:text-[17.8px] text-[14px] inline-block group border-b-2 border-white pb-[6px]"
              >
                Let’s Build Something Great Together{" "}
                <ArrowRight
                  className="inline-block transition-all group-hover:translate-x-1"
                  size={20}
                />
              </Link>
            </div>

            <div className="w-fit px-[20px] relative pt-[27.5px] md:hidden block">
              <div className="w-full h-auto z-10 relative ">
                <img
                  className="absolute z-[-1] bottom-0 translate-y-[70%]"
                  src="/assets/decoration/decoration-text.svg"
                  alt="decoration"
                />

                <Image
                  src="/assets/keizer-hero-image.webp"
                  height={560}
                  width={875}
                  alt="keizer-hero-image"
                  priority
                  className="z-10"
                  unoptimized
                />

                <div
                  className="absolute inset-0 right-[0.39%] bg-gradient-to-l md:from-[#161619] lg:from-[#161619]/70 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
