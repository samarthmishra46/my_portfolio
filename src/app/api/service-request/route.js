// ─────────────────────────────────────────────────────────────
// POST /api/service-request — store a freelancing service request.
// Body: { name, email, message, serviceId, serviceTitle, priceShown }
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const isEmail = (v) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req) {
  try {
    const { name, email, message, serviceId, serviceTitle, priceShown } =
      await req.json();

    if (!name?.trim() || !isEmail(email) || !serviceId) {
      return NextResponse.json(
        { error: "Please provide your name, a valid email and a service." },
        { status: 400 }
      );
    }

    const db = await getDb();
    await db.collection(COLLECTIONS.serviceRequests).insertOne({
      name: name.trim(),
      email: email.trim(),
      message: (message || "").trim(),
      serviceId,
      serviceTitle: serviceTitle || serviceId,
      priceShown: priceShown || null,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("service request failed:", err);
    return NextResponse.json(
      { error: "Could not submit your request. Please try again later." },
      { status: 500 }
    );
  }
}
