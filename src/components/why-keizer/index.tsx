import React from "react";

const WhyKeizer = () => {
  return (
    <section className="bg-[#2D2DC3] py-[100px] md:px-24 px-4">
      <div className="max-w-[1536px] relative mx-auto">
        <img
          src={"/assets/decoration/thick-circle.svg"}
          className="absolute bottom-0 left-0"
        />
        <img
          src={"/assets/decoration/thick-circle.svg"}
          className="absolute -right-20 top-1/2 rotate-90"
        />
        <img
          src={"/assets/decoration/thick-circle.svg"}
          className="absolute -top-20 left-1/2"
        />
        <header className="flex flex-col font-gb">
          <span className="font-semibold text-xl">Why</span>
          <h2 className="relative text-6xl mt-2 text-black w-fit inline-block">
            <span className="z-30 relative  font-bold text-black">Keizer?</span>
            <div className="inset-0 absolute bg-white z-20" />
            <div className="inset-0 absolute bg-[#1e96fc] translate-x-2 translate-y-2 z-10" />
          </h2>
        </header>
        <p className="w-2/3 mt-8 text-xl">
          At Keizer-Works, we are dedicated to transforming visions into
          impactful solutions. Our mission is to empower startups and businesses
          with a combination of cutting-edge tools, innovative design, and
          strategic marketing. Whether you need a robust product, a scalable
          MVP, or the tools to grow, we are your trusted partner every step of
          the way
        </p>
        <button className="font-sg translate-x-1 font-medium mt-8 group relative text-white px-4 text-lg py-2">
          <div className="absolute -bottom-1 -left-1 w-full h-full bg-white z-0"></div>
          <div className="absolute group-active:translate-y-1 group-active:-translate-x-1 transition-all inset-0 bg-black z-10"></div>
          <a
            href="#services"
            className="relative inline-block transition-all  duration-300 z-20 group-active:-translate-x-1 group-active:translate-y-1"
          >
            Explore more
          </a>
        </button>
      </div>
    </section>
  );
};

export default WhyKeizer;
