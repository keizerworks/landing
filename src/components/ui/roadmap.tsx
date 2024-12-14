type RoadmapProps = {
  title: string;
  description: string;
  containerClass?: string;
  color?: string;
  endElement?: boolean;
};

export default function RoadmapElement({
  title,
  description,
  containerClass,
  color,
  endElement,
}: RoadmapProps) {
  return (
    <div
      className={`roadmap flex flex-col group cursor-default relative pl-6 ${endElement ? "ml-[10px]" : "ml-2 border-l-[3px] border-foreground/40"} pb-8 -mt-[1px] ${containerClass}`}
    >
      {!endElement && (
        <div
          className={`absolute -left-[2.75px] w-[3px] h-[0px] bg-gradient-to-b from-transparent to-${color} animate-trickle`}
        />
      )}
      <div
        className={`absolute -left-[7px] size-3 rounded-full z-10 ${color ? `bg-${color}` : 'bg-white'}`}
      />
      <div
        className={`absolute -left-[7px] size-3 rounded-full animate-ping z-20 ${color ? `bg-${color}` : 'bg-white'}`}
      />
      <span className="text-lg font-semibold -mt-[7px]">{title}</span>
      <span>{description}</span>
    </div>
  );
}
