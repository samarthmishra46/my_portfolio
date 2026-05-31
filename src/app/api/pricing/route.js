// ─────────────────────────────────────────────────────────────
// GET /api/pricing
// Detects the visitor's country and returns the multiplier + FX rate the
// freelancing page uses to localize INR base prices.
//
// India → INR as-is. Otherwise → +20% then convert INR → local currency.
// Any failure falls back to a safe INR default so the page never breaks.
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { DEFAULT_PRICING } from "@/lib/pricing";
import { currencyForCountry } from "@/lib/countryCurrency";

export const dynamic = "force-dynamic";

// A non-default User-Agent — some geo APIs reject the default Node fetch UA.
const UA = "Mozilla/5.0 (compatible; PortfolioPricingBot/1.0)";

function clientIp(req) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "";
}

function isLocalIp(ip) {
  return (
    !ip ||
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("172.16.")
  );
}

const jsonFetch = (url) =>
  fetch(url, { headers: { "User-Agent": UA }, cache: "no-store" }).then((r) =>
    r.json()
  );

// Each provider returns { country, currencyCode? }. They're tried in order
// until one yields a country; currency is optional (filled from a map later).
async function viaFreeIpApi(ip) {
  const d = await jsonFetch(`https://freeipapi.com/api/json/${ip}`);
  if (!d?.countryCode) throw new Error("freeipapi failed");
  return { country: d.countryCode };
}

async function viaIpapi(ip) {
  const d = await jsonFetch(`https://ipapi.co/${ip}/json/`);
  if (!d || d.error || !d.country_code) throw new Error("ipapi failed");
  return { country: d.country_code, currencyCode: d.currency || null };
}

async function viaIpwho(ip) {
  const d = await jsonFetch(`https://ipwho.is/${ip}`);
  if (!d || d.success === false || !d.country_code) throw new Error("ipwho failed");
  return { country: d.country_code, currencyCode: d.currency?.code || null };
}

async function geolocate(req) {
  // On Vercel the country is available for free via an edge header.
  const vercelCountry = req.headers.get("x-vercel-ip-country");
  if (vercelCountry) return { country: vercelCountry };

  const ip = clientIp(req);

  // Local/private IPs can't be geolocated — treat as India.
  if (isLocalIp(ip)) {
    return { country: "IN", currencyCode: "INR" };
  }

  // Try providers in order until one resolves the country.
  for (const provider of [viaFreeIpApi, viaIpapi, viaIpwho]) {
    try {
      return await provider(ip);
    } catch {
      // try next provider
    }
  }
  throw new Error("all geo providers failed");
}

async function inrRateTo(currencyCode) {
  const res = await fetch("https://open.er-api.com/v6/latest/INR", {
    cache: "no-store",
  });
  const data = await res.json();
  const rate = data?.rates?.[currencyCode];
  if (!rate) throw new Error("fx rate unavailable");
  return rate;
}

export async function GET(req) {
  try {
    const geo = await geolocate(req);
    const isIndia = !geo.country || geo.country.toUpperCase() === "IN";
    if (isIndia) {
      return NextResponse.json(DEFAULT_PRICING);
    }

    // Use the provider's currency if given, else derive it from the country.
    const currencyCode = geo.currencyCode || currencyForCountry(geo.country);

    // No resolvable currency → safest to show INR.
    if (!currencyCode) {
      return NextResponse.json(DEFAULT_PRICING);
    }

    const rate = await inrRateTo(currencyCode);

    return NextResponse.json({
      country: geo.country,
      isIndia: false,
      currencyCode,
      currencySymbol: currencyCode,
      rate,
      multiplier: 1.2,
    });
  } catch {
    // Never break the page — fall back to INR.
    return NextResponse.json(DEFAULT_PRICING);
  }
}
