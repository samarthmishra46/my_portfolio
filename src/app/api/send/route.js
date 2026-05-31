// ─────────────────────────────────────────────────────────────
// POST /api/send — store a contact-form message in MongoDB.
// Body: { email, subject, message }
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { getDb, COLLECTIONS } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const isEmail = (v) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    if (!isEmail(email) || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Please provide a valid email, subject and message." },
        { status: 400 }
      );
    }

    const db = await getDb();
    await db.collection(COLLECTIONS.contacts).insertOne({
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact submit failed:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 500 }
    );
  }
}
