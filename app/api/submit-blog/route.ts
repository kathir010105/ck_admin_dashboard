import { NextResponse } from "next/server";
import { data } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, author, email, category, excerpt, content } = body;
    
    if (!title || !author || !email || !category || !excerpt || !content) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create new blog draft
    const newDraft = {
      id: `b_${Date.now()}`,
      title: title.trim(),
      author: author.trim(),
      email: email.trim(),
      category: category.trim(),
      tags: body.tags?.trim() || "",
      excerpt: excerpt.trim(),
      content: content.trim(),
      coverImage: body.coverImage?.trim() || "",
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "pending" as const
    };

    // Add to pending drafts
    const result = data.submitBlogDraft(newDraft);
    
    if (result.ok) {
      return NextResponse.json(
        { 
          message: "Blog submitted successfully",
          draftId: newDraft.id
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: result.message || "Failed to submit blog" },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error("Blog submission error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
