import { NextResponse } from "next/server";
import { data } from "@/lib/data";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const id = body?.id as string | undefined;
  const referenceCode = body?.referenceCode as string | undefined;
  
  if (!id) return NextResponse.json({ ok: false, message: "Missing id" }, { status: 400 });
  if (!referenceCode) return NextResponse.json({ ok: false, error: "Reference code is required" }, { status: 400 });
  
  // Verify reference code using the data module
  const isValidReferenceCode = data.verifyReferenceCode(id, referenceCode);
  
  if (!isValidReferenceCode) {
    return NextResponse.json({ 
      ok: false, 
      error: "Invalid reference code. Please check and try again." 
    }, { status: 400 });
  }
  
  const res = data.approveUser(id);
  if (!res.ok) return NextResponse.json(res, { status: 404 });
  
  return NextResponse.json({ ok: true });
}
