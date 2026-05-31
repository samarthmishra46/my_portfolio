"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import site from "@/data/site";

// Build the alternating "text, pause" sequence the type animation expects.
const typeSequence = site.roles.flatMap((role) => [role, 1200]);

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-3xl sm:text-4xl lg:text-7xl lg:leading-normal font-extrabold">
            <span className="text-transparent text-4xl sm:text-5xl lg:text-7xl bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I&apos;m{" "}
            </span>
            <br />
            <TypeAnimation
              sequence={["Samarth", 1500, ...typeSequence]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl max-w-2xl">
            {site.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/#contact"
              className="px-6 py-3 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white text-center transition-all"
            >
              Hire Me
            </Link>
            <Link
              href="/freelancing"
              className="px-6 py-3 w-full sm:w-fit rounded-full border border-primary-500/60 text-white text-center hover:bg-primary-500/10 transition-all"
            >
              Freelancing
            </Link>
            <Link
              href={site.resumeUrl}
              className="px-px py-px w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white"
            >
              <span className="block bg-[#121212] hover:bg-[#181818] rounded-full px-5 py-2.5 text-center transition-colors">
                Download CV
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative ring-1 ring-primary-500/20">
            <Image
              src="/images/photo_2025-07-20_08-48-00-removebg-preview.png"
              alt={site.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
