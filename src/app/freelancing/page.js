"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import services from "@/data/services";
import {
  DEFAULT_PRICING,
  localizePrice,
  formatPrice,
} from "@/lib/pricing";

export default function FreelancingPage() {
  const [pricing, setPricing] = useState(DEFAULT_PRICING);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [active, setActive] = useState(null); // service being requested

  useEffect(() => {
    let cancelled = false;
    fetch("/api/pricing")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data) setPricing(data);
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoadingPrice(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const priceFor = (service) => {
    const amount = localizePrice(service.basePriceINR, pricing);
    return formatPrice(amount, pricing.currencyCode, pricing.currencySymbol);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-28 mx-auto px-6 sm:px-12 py-8 flex-1">
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
            Freelancing Services
          </h1>
          <p className="text-[#ADB7BE] mt-4">
            Full-stack builds, frontend work, AI integrations and deployments —
            shipped to production. Pick a service below and send a request.
          </p>
          <p className="text-xs text-gray-500 mt-3">
            {pricing.isIndia
              ? "Prices shown in INR."
              : `Prices auto-adjusted for your region (${pricing.country}) and shown in ${pricing.currencyCode}.`}{" "}
            Contact for an exact quote.
          </p>
        </header>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service) => (
            <li
              key={service.id}
              className="flex flex-col rounded-2xl border border-[#33353F] bg-[#181818] p-6 hover:border-primary-500/60 transition-colors"
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h2 className="text-white text-xl font-semibold">
                {service.title}
              </h2>
              <p className="text-[#ADB7BE] text-sm mt-2 flex-1">
                {service.summary}
              </p>

              <ul className="mt-4 space-y-1.5">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="text-sm text-gray-300 flex items-start gap-2"
                  >
                    <span className="text-primary-400 mt-0.5">✓</span>
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-[#33353F]">
                <p className="text-xs text-gray-500">{service.priceLabel}</p>
                <p className="text-2xl font-bold text-white">
                  {loadingPrice ? (
                    <span className="text-gray-500 text-base">Loading…</span>
                  ) : (
                    priceFor(service)
                  )}
                </p>
                <button
                  onClick={() =>
                    setActive({ ...service, priceShown: priceFor(service) })
                  }
                  className="mt-4 w-full px-4 py-2.5 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white text-sm font-medium transition-all"
                >
                  Request this service
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <Link href="/#contact" className="text-primary-400 hover:text-primary-300">
            Have something custom in mind? Get in touch →
          </Link>
        </div>
      </div>

      {active ? (
        <RequestModal service={active} onClose={() => setActive(null)} />
      ) : null}

      <Footer />
    </main>
  );
}

function RequestModal({ service, onClose }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
      serviceId: service.id,
      serviceTitle: service.title,
      priceShown: service.priceShown,
    };
    try {
      const res = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("done");
      } else {
        setError(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#33353F] bg-[#181818] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-white text-lg font-semibold">
              Request: {service.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {service.priceLabel} {service.priceShown}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {status === "done" ? (
          <div className="mt-6 rounded-lg border border-green-600/40 bg-green-600/10 p-4">
            <p className="text-green-400 font-medium">Request sent! 🎉</p>
            <p className="text-[#ADB7BE] text-sm mt-1">
              I&apos;ll review it and get back to you by email.
            </p>
            <button
              onClick={onClose}
              className="mt-4 text-primary-400 hover:text-primary-300 text-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              name="name"
              required
              placeholder="Your name"
              className="bg-[#121212] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg p-2.5"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="bg-[#121212] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg p-2.5"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Tell me a bit about your project…"
              className="bg-[#121212] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg p-2.5"
            />
            {error ? <p className="text-red-400 text-sm">{error}</p> : null}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full px-4 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-medium transition-colors"
            >
              {status === "submitting" ? "Sending…" : "Send request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
