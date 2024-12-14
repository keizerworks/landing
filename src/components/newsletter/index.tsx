const NewsLetter = () => {
  return (
    <section
      id="newsLetter"
      className="md:px-[100px] md:pt-[100px] pt-[60px] px-[24px] "
    >
      <div className="flex border-b border-neutral-600 md:pb-[100px] pb-[60px] md:flex-row flex-col gap-[24px] lg:items-center items-start justify-between max-w-[1536px] mx-auto">
        <p className="text-[24px] leading-[100%] font-bold">
          Join our newsletter{" "}
          <br className="lg:block md:hidden block" />
          to stay up to date with us
        </p>

        <div className="w-full sm:max-w-[450px] flex items-center bg-[#151616] rounded-lg overflow-hidden">
          <input
            className="w-full relative py-[14px] pl-[24px] pr-[12px] text-white bg-transparent focus:outline-none outline-none"
            type="text"
            placeholder="Enter your email."
          />

          <button className="text-[14px] py-[14px] pl-[12px] pr-[24px] text-white/60 hover:text-white active:text-white transition-all ease-in-out duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
