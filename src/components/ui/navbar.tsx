"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NavLink from "../shared";
import { AlignJustify } from "lucide-react";
import { cn } from "~/lib/utils";
import Link from "next/link";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [openSideBar, setOpenSideBar] = useState(false);
  const links = ["Our Projects", "Services", "News", "About Us"];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <div
        className={cn(
          "inset-0 smooth-transition z-[500] md:hidden px-[24px] py-[100px] block bg-black/80 backdrop-blur-md fixed",
          openSideBar ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <p className="text-[60px] font-bold">Navigate</p>
        <div>
          <ul className="pt-[40px]">
            {links.map((link, index) => {
              return (
                <li
                  onClick={() => setOpenSideBar(() => false)}
                  key={link}
                  className={cn(
                    "text-[20px] fade-in-blur-1 py-[20px]",
                    index !== links.length - 1 && "border-b border-neutral-700",
                  )}
                >
                  <Link href={`#${link.split(" ").join("").toLowerCase()}`}>
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <nav
        className={cn(
          `w-full text-white ${openSideBar ? "bg-transparent" : "bg-black/50"} fixed z-[1000] top-0 flex justify-between items-center lg:px-[40px] px-[20px] transition-a duration-300 ease-in-out`,
          visible
            ? `md:h-[130px] h-[80px] md:backdrop-blur-none ${openSideBar ? "backdrop-blur-none bg-transparent" : "backdrop-blur-md "}`
            : `md:h-[80px] h-[80px] ${openSideBar ? "bg-transparent" : "bg-black/15  backdrop-blur-md "}`,
        )}
      >
        <div className="max-w-[1440px] w-full flex justify-between items-center mx-auto">
          <div className="flex fade-in-blur-left-0 cursor-pointer items-center gap-[5px]">
            <AlignJustify
              type="button"
              onClick={() => setOpenSideBar((prev) => !prev)}
              className="md:hidden block"
              fontWeight={900}
            />

            <Link href="#">
              <Image
                src="/assets/logos/keizer-logo-name.svg"
                width={175}
                height={79.82}
                alt="keizer-brand-logo"
                className={cn(
                  "md:w-[175px] md:h-[79.82px] sm:w-[135px] sm:h-[58.856px] w-[80.4px] h-[49.83px] transition-all",
                  visible ? "scale-100" : "md:scale-[0.9] scale-100",
                )}
              />
            </Link>
          </div>

          <div className="flex fade-in-0 duration-1000 animate-in items-center lg:gap-[75px] gap-[40px]">
            <ul className="md:flex hidden lg:gap-[36px] gap-[30px] md:text-[16px] text-[14px]">
              {links.map((link, index) => {
                return (
                  <li key={link}>
                    <NavLink
                      className="font-[300] text-[16px]"
                      linkName={link}
                      index={index}
                    />
                  </li>
                );
              })}
            </ul>

            <Link
              href="#contact"
              className="font-sans flex flex-center bg-white hover:bg-neutral-300 text-black w-[102px] h-[36px] font-[700] text-[16px] rounded-[4px]"
            >
              Let's talk
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
