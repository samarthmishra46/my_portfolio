// ─────────────────────────────────────────────────────────────
// Pure pricing helpers shared by the freelancing page + API.
//
// Flow: base price is in INR.
//   • India  → show INR as-is (multiplier 1, rate 1).
//   • Else   → price * 1.20, then convert INR → local currency at `rate`.
// ─────────────────────────────────────────────────────────────

// The safe default used whenever geo / FX lookups fail.
export const DEFAULT_PRICING = {
  country: "IN",
  isIndia: true,
  currencyCode: "INR",
  currencySymbol: "₹",
  rate: 1,
  multiplier: 1,
};

// Round to a clean, human-friendly step based on magnitude.
export function roundNice(n) {
  if (!isFinite(n) || n <= 0) return 0;
  let step;
  if (n < 100) step = 5;
  else if (n < 1000) step = 10;
  else if (n < 10000) step = 50;
  else if (n < 100000) step = 100;
  else step = 1000;
  return Math.round(n / step) * step;
}

// Convert an INR base price into the visitor's localized amount.
export function localizePrice(basePriceINR, { rate = 1, multiplier = 1 } = {}) {
  return roundNice(basePriceINR * multiplier * rate);
}

// Format an amount with the right currency. Falls back to a manual symbol
// prefix if Intl doesn't recognise the currency code.
export function formatPrice(amount, currencyCode = "INR", symbol = "₹") {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${symbol}${Math.round(amount).toLocaleString()}`;
  }
}
