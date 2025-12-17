"use client";

import Image from "next/image";
import RoadmapElement from "../ui/roadmap";
import data from "./data.json";
import { useTranslation } from "~/hooks/useTranslation";
import { useTranslationObject } from "~/hooks/useTranslation";

const ClientSection = () => {
  const dddmLabel = useTranslation("The DDDM");
  const designLabel = useTranslation("We Design,");
  const developLabel = useTranslation("Develop, Deliver");
  const maintainLabel = useTranslation("and Maintain");
  const descriptionText = useTranslation(
    "From concept to launch, we provide reliable full-stack development services. Our team specializes in designing, building, and maintaining high-quality MVPs and scalable applications, bringing your vision to life"
  );
  const roadmapLabel = useTranslation("The Roadmap");
  
  const translatedData = useTranslationObject(data);

  return (
    <section id="client" className="bg-primary space-y-[60px] md:py-[100px] py-[60px] ">
      <div className="md:px-[100px] px-[24px] md:py-[60px] mx-auto max-w-[1536px] tracking-[-1%] flex md:flex-row flex-col justify-between md:items-center">
        <div>
          <p className="uppercase text-[16px] pb-[10px]">{dddmLabel}</p>
          <h2 className="md:text-[54px] text-[32px] font-bold leading-[100%]">
            {designLabel}
            <br />
            {developLabel}
            <br />
            {maintainLabel}
          </h2>
        </div>

        <div className="md:w-[640px] w-full md:text-[20px] mt-[24px]  md:leading-[24px] leading-[18px] md:mt-0 text-[15px]">
          <p>{descriptionText}</p>
        </div>
      </div>
      <div className="md:px-[100px] px-[24px] mx-auto max-w-[1536px] tracking-[-1%] flex md:flex-row flex-col justify-between md:items-center ">
        <div>
          <h3 className="font-medium md:text-[27px] text-[16px] mb-6">
            {roadmapLabel}
          </h3>
          <div className="flex flex-col flex-nowrap items-start">
            {translatedData.map((item, index) => (
              <RoadmapElement
                key={index}
                title={item.title}
                description={item.description}
                color={item.color}
                endElement={index === translatedData.length - 1}
              />
            ))}
          </div>
        </div>
        <div className="md:pr-24">
          <Image
            src={"/assets/logos/keizer-og.svg"}
            width={897}
            height={966}
            alt="Keizer Roadmap"
            className="w-full max-w-[400px] h-auto aspect-[897/966] rounded-[20px] "
          />
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
