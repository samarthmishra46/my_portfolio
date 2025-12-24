import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-8 flex justify-between ">

        <span>          <Image 
            src="/images/footerLogo.png" 
            alt="Samarth" 
            className="h-12 w-auto md:h-20 lg:h-28 "
            width={900}
            height={900}
          /></span>
        
      </div>
    </footer>
  );
};

export default Footer;
