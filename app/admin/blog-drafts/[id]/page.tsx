"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Draft = {
  id: string;
  title: string;
  author: string;
  updatedAt: string;
  content: string;
};

export default function DraftDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/blog-drafts/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch draft");
      const data = await res.json();
      setDraft(data.draft);
    } catch (_error: unknown) {
      setError("Failed to load draft");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function act(path: "publish" | "delete") {
    if (!draft) return;
    const res = await fetch(`/api/admin/blog-drafts/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: draft.id }),
    });
    if (res.ok) {
      router.push("/admin/blog-drafts");
    } else {
      alert("Action failed");
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-lg loading-state">Loading draft...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-lg error-message p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }
  
  if (!draft) {
    return (
      <div className="text-center py-8">
        <div className="text-lg empty-state">Draft not found.</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{draft.title}</h1>
        <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
          By {draft.author} • Updated {new Date(draft.updatedAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
        <button 
          className="btn btn-primary text-sm px-6 py-3" 
          onClick={() => act("publish")}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Approve & Publish
        </button>
        <button 
          className="btn btn-danger text-sm px-6 py-3" 
          onClick={() => act("delete")}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Draft
        </button>
      </div>

      <div className="rounded-2xl p-8 border" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Draft Content</h2>
        <article className="prose max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-[15px] leading-7 p-6 rounded-lg border" style={{ color: 'var(--foreground)', backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            {draft.content}
          </pre>
        </article>
      </div>
    </div>
  );
}



