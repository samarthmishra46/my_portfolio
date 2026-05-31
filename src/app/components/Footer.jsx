import React from "react";
import Image from "next/image";
import Link from "next/link";
import site from "@/data/site";

const Footer = () => {
  return (
    <footer className="footer border-t border-[#33353F] text-white">
      <div className="container mx-auto p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Image
          src="/images/footerLogo.png"
          alt={site.name}
          className="h-12 w-auto md:h-20"
          width={900}
          height={900}
        />
        <div className="flex flex-col items-center sm:items-end gap-2">
          <div className="flex gap-4 text-[#ADB7BE]">
            <Link href={site.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              GitHub
            </Link>
            <Link href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              LinkedIn
            </Link>
            <Link href={`mailto:${site.email}`} className="hover:text-white">
              Email
            </Link>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
