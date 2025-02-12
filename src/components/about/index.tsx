const AboutSection = () => {
  return (
    <section id="aboutus" className="bg-[#17171A]">
      <div className="max-w-[1536px] flex flex-col xl:gap-0 mx-auto relative md:p-[100px] px-[24px] py-[60px]">
        <header className="w-full relative">
          <span className="text-[15px] uppercase">About us</span>
          <h2 className="relative font-gb capitalize sm:pt-[0px] pt-[10px] lg:text-[96px] z-50 md:text-[70px] text-[45px] lg:leading-[80px] md:leading-[80px] leading-[50px] font-bold  ">
            <span className="relative z-10">
              We save <br />
              businesses <br /> from ineffective <br /> & ugly designs.
            </span>

            <img
              src="/assets/decoration/paint-brush.svg"
              className="absolute bottom-0 xl:w-auto w-[80%] translate-y-[40%] z-0"
              alt="paint-decoration"
            />
          </h2>

          <img
            className="absolute xl:block z-10 hidden top-0 right-0"
            src="/assets/decoration/keizer-grid.svg"
            alt="keizer-grid"
          />
        </header>

        <img
          className="w-full mt-[70px] xl:hidden block"
          src="/assets/decoration/keizer-grid.svg"
          alt="keizer-grid"
        />

        <div className="xl:mt-[80px] md:w-1/3 relative z-40 mt-[33px] md:text-[20px] text-[15px]">
          <p>
            We help your startup grow by leveraging smart marketing strategies
            designed to reach the right audience and scale effectively. From
            branding to performance marketing, we ensure that your product gains
            the visibility and traction it deserves.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
