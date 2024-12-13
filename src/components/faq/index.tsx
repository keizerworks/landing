import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import data from "./data.json";

export default function FAQ() {
  return (
    <section id="faq">
      <div className="max-w-[1536px] flex flex-col xl:gap-0 mx-auto relative md:p-[100px] px-[24px] py-[60px]">
        <span className="uppercase">Collaboration</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
          Frequently asked questions
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {data.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-zinc-800"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="text-zinc-400 font-semibold">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-zinc-200">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
