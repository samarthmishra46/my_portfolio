"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import services from "@/data/services";

// Homepage teaser — shows the first 3 services (no prices). Full list with
// region-localized pricing lives on /freelancing.
const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const featured = services.slice(0, 3);

  return (
    <section id="services" className="py-12">
      <h2 className="text-center text-4xl font-bold text-white mb-3">
        Freelancing
      </h2>
      <p className="text-center text-[#ADB7BE] mb-10 max-w-2xl mx-auto">
        Available for freelance work — from frontend builds to full-stack apps
        and production AI integrations.
      </p>
      <ul ref={ref} className="grid md:grid-cols-3 gap-6">
        {featured.map((service, index) => (
          <motion.li
            key={service.id}
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
            transition={{ duration: 0.3, delay: index * 0.15 }}
            className="rounded-xl border border-[#33353F] bg-[#181818] p-6 hover:border-primary-500/60 transition-colors"
          >
            <div className="text-3xl mb-3">{service.icon}</div>
            <h3 className="text-white text-xl font-semibold mb-2">
              {service.title}
            </h3>
            <p className="text-[#ADB7BE] text-sm">{service.summary}</p>
          </motion.li>
        ))}
      </ul>
      <div className="text-center mt-10">
        <Link
          href="/freelancing"
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white transition-all"
        >
          View all services & pricing
        </Link>
      </div>
    </section>
  );
};

export default ServicesSection;
