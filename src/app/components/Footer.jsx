import React from "react";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <span>          <img 
            src="https://res.cloudinary.com/dix4pzu0k/image/upload/v1758357184/Screenshot_from_2025-09-20_13-55-50_wkbydy.png" 
            alt="Samarth" 
            className="h-10 w-auto md:h-12 lg:h-14"
          /></span>
        <p className="text-slate-600">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
