import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import StrategyCard from "./strategy-card";

const strategies = [
  {
    number: "1",
    label: "BUILD",
    title: "End-to-End Application Development",
    description:
      "From concept to launch, we build high-quality full-stack applications tailored to your startup's needs.",
    linkHref: "/application-development",
  },
  {
    number: "2",
    label: "GROW",
    title: "Marketing & Growth Strategy",
    description:
      "Leverage branding, SEO, and user acquisition strategies to expand your reach and maximize engagement.",
    linkHref: "/marketing-strategy",
  },
  {
    number: "3",
    label: "CONNECT",
    title: "Funding & Investor Network",
    description:
      "Gain access to venture capitalists and investors to secure the financial boost your startup needs.",
    linkHref: "/funding-support",
  },
  {
    number: "4",
    label: "PRODUCT DESIGN",
    title: "User Experience & Interface Design",
    description:
      "Create intuitive, engaging user experiences that enhance usability and increase conversion rates.",
    linkHref: "/ux-ui-design",
  },
  {
    number: "5",
    label: "TECH INNOVATION",
    title: "Scalable Software Architecture",
    description:
      "Develop robust, scalable systems to support your startup's growth and evolving business needs.",
    linkHref: "/software-architecture",
  },
  {
    number: "6",
    label: "SMART SOLUTIONS",
    title: "AI & Machine Learning Integration",
    description:
      "Enhance decision-making and automate processes with AI-powered solutions tailored to your business.",
    linkHref: "/ai-ml-integration",
  },
];

const StrategySection = () => {
  return (
    <section
      id="services"
      className="overflow-hidden h-auto relative bg-[#161619]"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "13px 13px",
        }}
      />

      <div className="max-w-[1536px] relative mx-auto md:px-[100px] px-[24px] md:py-[150px] gap-[50px] py-[60px] grid-cols-1 grid md:grid-cols-2">
        <img
          className="absolute z-[0] top-[68%] lg:block hidden left-[118px] scale-[1.05] -translate-y-1/2 "
          src="/assets/decoration/decoration-text.svg"
          alt="decoration-text"
        />

        <div className="w-fit">
          <div className="w-fit">
            <p className="uppercase font-gb text-[16px] font-semibold pb-[10px]">
              Keizer Works
            </p>

            <h2 className="md:text-[50px] w-fit font-gb text-nowrap text-[32px] mt-[24px] font-bold leading-tight">
              Empowering startups &nbsp;
              <br className="md:block hidden" />
              to build, grow, &nbsp;
              <br className="md:block hidden" />
              and connect with &nbsp;
              <br className="md:block hidden" />
              the right resources.&nbsp;
            </h2>
          </div>

          <button className="font-sg translate-x-1 mt-8 group relative text-black font-semibold px-4 text-lg py-2">
            <div className="absolute -bottom-1 -left-1 w-full h-full bg-black z-0"></div>
            <div className="absolute group-active:translate-y-1 group-active:-translate-x-1 transition-all inset-0 bg-white z-10"></div>
            <a
              href="#contact"
              className="relative inline-block transition-all  duration-300 z-20 group-active:-translate-x-1 group-active:translate-y-1"
            >
              Contact now
            </a>
          </button>
        </div>

        <div className="lg:w-[600px] flex-1 flex-shrink-0 lg:pt-[0px] pt-[50px] w-full ">
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
