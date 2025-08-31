import { NextResponse } from "next/server";
import { data } from "@/lib/data";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const id = body?.id as string | undefined;
  if (!id) return NextResponse.json({ ok: false, message: "Missing id" }, { status: 400 });
  const res = data.publishDraft(id);
  if (!res.ok) return NextResponse.json(res, { status: 404 });
  return NextResponse.json({ ok: true });
}
