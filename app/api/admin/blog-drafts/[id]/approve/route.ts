import { NextResponse } from "next/server";
import { data } from "@/lib/data";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const resolvedParams = await params;
    const id = body?.id || resolvedParams.id;
    
    if (!id) {
      return NextResponse.json(
        { message: "Missing draft ID" },
        { status: 400 }
      );
    }

    const result = data.publishDraft(id);
    
    if (result.ok) {
      return NextResponse.json(
        { message: "Blog draft approved successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: result.message || "Failed to approve draft" },
        { status: 404 }
      );
    }
    
  } catch (error) {
    console.error("Blog approval error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
