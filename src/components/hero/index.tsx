"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useAnimation,
  MotionValue,
} from "motion/react";
import { useEffect, useState } from "react";
import CursorIcon from "../assets/cursor-icon";

interface AnimatedTextProps {
  text: string;
  delay: number;
}

interface FloatingLabelProps {
  labelDelay: number;
  cursorY: MotionValue<number>;
}

const AnimatedText = ({ text, delay = 0 }: AnimatedTextProps) => {
  return (
    <span className="inline-block tracking-tight">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className={`inline-block ${char === " " ? "w-[0.20em]" : ""}`}
          initial={{
            opacity: 0,
            y: 50,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: char === " " ? 0 : 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 12,
            mass: 0.1,
            delay: delay + index * 0.05,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const HeroSection = () => {
  const firstLineDelay = 0;
  const secondLineDelay = 0.5;
  // Calculate total animation time for text + a small buffer
  const textAnimationDuration = 1.0; // Approximate time for text animation
  const underlineDelay = firstLineDelay + textAnimationDuration;
  const labelDelay = underlineDelay + 0.3;

  const visionControls = useAnimation();
  const missionControls = useAnimation();
  const cursorPositionY = useMotionValue(60);

  useEffect(() => {
    const timeout = setTimeout(() => {
      visionControls.start({
        width: "100%",
        opacity: 1,
        transition: { duration: 0.3 },
      });
    }, underlineDelay * 1000);

    return () => clearTimeout(timeout);
  }, [visionControls, underlineDelay]);

  return (
    <section
      id="hero"
      className="max-h-[800px] overflow-hidden relative flex items-start max-w-[1536px] mx-auto pt-[200px] md:px-24 px-4 h-screen bg-black w-full"
    >
      <div className="font-gb relative text-white w-full">
        <h1
          className="flex flex-col items-start text-8xl leading-[1.2] relative"
          onMouseEnter={async () => {
            cursorPositionY.set(180);
            await visionControls.start({
              width: 0,
              transition: { duration: 0.15 },
            });
            await missionControls.start({
              width: "100%",
              opacity: 1,
              transition: { duration: 0.15 },
            });
          }}
          onMouseLeave={async () => {
            cursorPositionY.set(60);
            await missionControls.start({
              width: 0,
              transition: { duration: 0.15 },
            });
            await visionControls.start({
              width: "100%",
              opacity: 1,
              transition: { duration: 0.15 },
            });
          }}
        >
          <span>
            <AnimatedText text="Your " delay={firstLineDelay} />
            <span className="inline-block relative">
              <AnimatedText text="Vision" delay={firstLineDelay + 0.2} />
              <motion.span
                className="absolute inline-block left-0 bottom-0 bg-[#ff66ff] h-2"
                initial={{ width: 0, opacity: 0 }}
                animate={visionControls}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              />
            </span>
          </span>
          <span>
            <AnimatedText text="Our " delay={secondLineDelay} />
            <span className="inline-block relative">
              <AnimatedText text="Mission" delay={secondLineDelay + 0.2} />
              <motion.span
                className="absolute inline-block left-0 bottom-0 bg-[#ff66ff] h-2"
                initial={{ width: 0, opacity: 0 }}
                animate={missionControls}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
              />
            </span>
          </span>

          <FloatingLabel labelDelay={labelDelay} cursorY={cursorPositionY} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 2,
            type: "spring",
            stiffness: 100,
            damping: 12,
            mass: 0.1,
          }}
          className="font-sg font-medium text-lg mt-8"
        >
          We are the trusted partner for startups and businesses, offering{" "}
          <br />
          innovative solutions that turn your ideas into impactful realities
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.8,
            type: "spring",
            stiffness: 100,
            damping: 12,
            mass: 0.1,
          }}
          className="absolute h-[283px] w-[565px] top-12 pointer-events-none left-8"
        >
          <img
            src="/assets/decoration/decoration.svg"
            alt=""
            className="h-full w-full"
          />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 2.1,
            type: "spring",
            stiffness: 100,
            damping: 12,
            mass: 0.1,
          }}
          className="font-sg translate-x-1 font-medium mt-8 group relative text-white px-4 text-lg py-2"
        >
          <div className="absolute -bottom-1 -left-1 w-full h-full bg-white z-0"></div>
          <div className="absolute group-active:translate-y-1 group-active:-translate-x-1 transition-all inset-0 bg-[#2d2dc3] z-10"></div>
          <span className="relative inline-block transition-all  duration-300 z-20 group-active:-translate-x-1 group-active:translate-y-1">
            Request a Demo
          </span>
        </motion.button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 2.1,
          type: "spring",
          stiffness: 100,
          damping: 12,
          mass: 0.1,
        }}
        className="absolute bottom-20 -right-10 pointer-events-none"
      >
        <img
          src="/assets/decoration/decoration-text.svg"
          alt=""
          className="h-full w-full"
        />
      </motion.div>
      <div className="relative flex-shrink-0 w-[412px] aspect-square">
        <motion.img
          initial={{ opacity: 0, y: 14, x: -14 }}
          animate={{
            opacity: 1,
            y: 0,
            x: 0,
          }}
          transition={{
            delay: 1.9,
            type: "spring",
            stiffness: 100,
            damping: 12,
            mass: 0.1,
          }}
          src={"/assets/logos/keizer-bg-blue.svg"}
          className="z-30 absolute inset-0 object-cover"
          alt="keizer-logo"
        />
        <motion.div
          initial={{ opacity: 0, y: 24, x: -24 }}
          animate={{
            opacity: 1,
            y: 7,
            x: -15,
          }}
          transition={{
            delay: 2.0,
            type: "spring",
            stiffness: 100,
            damping: 12,
            mass: 0.1,
          }}
          className="inset-0 absolute z-10 -translate-x-3 translate-y-3 bg-white"
        />
        <motion.div
          initial={{ opacity: 0, y: 54, x: -54 }}
          animate={{
            opacity: 1,
            y: 20,
            x: -28,
          }}
          transition={{
            delay: 2.1,
            type: "spring",
            stiffness: 100,
            damping: 12,
            mass: 0.1,
          }}
          className="inset-0 absolute z-0 -translate-x-6 translate-y-6 bg-[#1e96fc]"
        />
      </div>
    </section>
  );
};

const FloatingLabel: React.FC<FloatingLabelProps> = ({
  labelDelay = 0,
  cursorY,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const y = useSpring(cursorY, { damping: 25, stiffness: 150 });

  const randomStart = {
    x: Math.random() * window.innerWidth - 250,
    y: Math.random() * window.innerHeight - 100,
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = (e.clientX - window.innerWidth / 2) * 0.02;
      mouseX.set(500 + deltaX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  const floatingAnimation = {
    y: [0, -6, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      initial={{
        x: randomStart.x,
        y: randomStart.y,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 1],
        x: [randomStart.x, randomStart.x, 500],
        y: [randomStart.y, randomStart.y, 60],
      }}
      transition={{
        duration: 0.5,
        delay: labelDelay,
        times: [0, 0.2, 1],
        ease: ["easeOut", "easeOut", "easeInOut"],
      }}
      style={{ x, y }}
      className="absolute"
    >
      <motion.span
        animate={floatingAnimation}
        className="text-sm inline-block px-4 py-0.5 bg-[#ff66ff] text-[#383A48] border-2 border-[#383A48]"
      >
        <span>
          <span className="inline-block relative h-full w-full">
            Keizer
            <span className="absolute -top-6 -left-10">
              <CursorIcon />
            </span>
          </span>
        </span>
      </motion.span>
    </motion.div>
  );
};

export default HeroSection;
