import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <span>          <Image 
            src="/images/footerLogo.png" 
            alt="Samarth" 
            className="h-10 w-auto md:h-12 lg:h-14"
            width={500}
            height={500}
          /></span>
        <p className="text-slate-600">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
