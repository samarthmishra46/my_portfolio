"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";
import site from "@/data/site";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed mx-auto border-b border-[#33353F] top-0 left-0 right-0 z-20 bg-[#121212]/90 backdrop-blur">
      <div className="flex container flex-wrap items-center justify-between mx-auto px-4">
        <Link href={"/"} className="text-2xl md:text-5xl text-white font-semibold">
          <Image
            src="/images/footerLogo.png"
            alt={site.name}
            className="h-12 w-auto md:h-20 lg:h-28"
            width={900}
            height={900}
          />
        </Link>
        <div className="mobile-menu block md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
          >
            {navbarOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {site.navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={site.navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
