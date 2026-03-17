"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

const imgLogoDark = "/images/about-us/logo.png";
const imgLogoWhite = "/images/contact-us/logo-white.png";

interface HeaderProps {
  transparent?: boolean;
  whiteLogo?: boolean;
  whiteMenu?: boolean;
}

export default function Header({ transparent = false, whiteLogo = false, whiteMenu = false }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoSrc = isScrolled ? imgLogoDark : (whiteLogo ? imgLogoWhite : imgLogoDark);
  const textColor = isScrolled ? 'text-[#353638]' : (whiteLogo ? 'text-white' : 'text-[#353638]');

  const getPageTitle = () => {
    if (pathname === "/about-us") return "About Us";
    if (pathname === "/our-services") return "Our Services";
    if (pathname === "/contact-us") return "Contact Us";
    return null;
  };

  const pageTitle = getPageTitle();

  return (
    <header
      className={`py-4 lg:py-8 px-4 lg:px-20 fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : transparent
            ? 'bg-transparent'
            : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="relative h-[37px] w-[134px] cursor-pointer">
            <Image alt="Nexium Trio Logo" src={logoSrc} fill className="object-contain" />
          </Link>
          {pageTitle && (
            <p className={`hidden sm:block text-base lg:text-xl font-montserrat font-semibold transition-colors duration-300 ${isScrolled ? 'text-[#727272]' : whiteLogo ? 'text-white' : 'text-[#727272]'}`}>
              | {pageTitle}
            </p>
          )}
        </div>
        <Navbar isScrolled={isScrolled} whiteMenu={whiteMenu} />
      </div>
    </header>
  );
}
