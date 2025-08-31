import { NextResponse, NextRequest } from "next/server";
import { data } from "@/lib/data";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const draft = data.getBlogDraft(id);
  if (!draft) return NextResponse.json({ ok: false, message: "Draft not found" }, { status: 404 });
  return NextResponse.json({ ok: true, draft });
}


