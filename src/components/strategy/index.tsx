import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import StrategyCard from "./strategy-card";

const strategies = [
  {
    number: "1",
    label: "BRAND BUILDING",
    title: "Brand Strategy & Art Direction",
    description:
      "Creating a higher spacing and how people move through a unique and impactful campaign.",
    linkHref: "/brand-strategy",
  },
  {
    number: "2",
    label: "ONLINE GROWTH",
    title: "Digital Marketing and SEO",
    description:
      "Leveraging cutting-edge digital techniques to increase your online presence and drive organic growth.",
    linkHref: "/digital-marketing",
  },
  {
    number: "3",
    label: "STORYTELLING",
    title: "Content Creation & Storytelling",
    description:
      "Crafting compelling narratives that resonate with your audience and strengthen your brand identity.",
    linkHref: "/content-creation",
  },
  {
    number: "4",
    label: "DESIGN EXCELLENCE",
    title: "User Experience & Interface Design",
    description:
      "Designing intuitive and engaging user experiences that delight your customers and boost conversion rates.",
    linkHref: "/ux-design",
  },
  {
    number: "5",
    label: "TECHNICAL INNOVATION",
    title: "Software Architecture & Scalability",
    description:
      "Developing robust, scalable software solutions tailored to meet the demands of growing businesses and complex systems.",
    linkHref: "/software-architecture",
  },
  {
    number: "6",
    label: "SMART SOLUTIONS",
    title: "AI & Machine Learning Integration",
    description:
      "Implementing AI-driven solutions to enhance decision-making, automate processes, and unlock new capabilities within your applications.",
    linkHref: "/ai-ml-integration",
  },
];

const StrategySection = () => {
  return (
    <section id="services" className=" h-auto relative bg-[#161619]">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "13px 13px",
        }}
      />

      <div className="max-w-[1536px] relative mx-auto md:px-[100px] px-[24px] md:py-[150px] py-[60px] flex lg:flex-row flex-col justify-between">
        <img
          className="absolute z-[0] top-[68%] lg:block hidden left-[118px] scale-[1.05] -translate-y-1/2 "
          src="/assets/decoration/decoration-text.svg"
          alt="decoration-text"
        />

        <div>
          <div>
            <p className="uppercase text-[16px] font-semibold pb-[10px]">
              Team keizer
            </p>

            <h2 className="md:text-[54px] text-[32px] mt-[24px] font-bold leading-[100%]">
              We’re a team of&nbsp;
              <br className="md:block hidden" />
              creatives who are&nbsp;
              <br className="md:block hidden" />
              excited about&nbsp;
              <br className="md:block hidden" />
              unique ideas.
            </h2>
          </div>

          <Button
            asChild
            className="bg-white text-[16px] mt-[38px] text-black hover:bg-white/90 text-lg font-semibold rounded-[4px] px-[18px] py-[24px]"
          >
            <Link href="#contact" className="flex items-center group gap-2">
              Contact Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:opacity-100 opacity-60 transition-all" />
            </Link>
          </Button>
        </div>

        <div className="lg:w-[600px] lg:pt-[0px] pt-[50px] w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[60px] gap-[30px] w-fit  ">
            {strategies.map((strategy, index) => (
              <StrategyCard
                key={index}
                label={strategy.label}
                number={strategy.number}
                title={strategy.title}
                description={strategy.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategySection;
