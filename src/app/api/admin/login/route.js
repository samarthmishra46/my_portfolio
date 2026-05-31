// ─────────────────────────────────────────────────────────────
// POST /api/admin/login — verify ADMIN_USER/ADMIN_PASS, set session cookie.
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  checkCredentials,
  createSessionToken,
} from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { user, pass } = await req.json();

    if (!checkCredentials(user, pass)) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
