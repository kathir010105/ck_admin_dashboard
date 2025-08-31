"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Draft = {
  id: string;
  title: string;
  author: string;
  email: string;
  category: string;
  tags: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  submittedAt: string;
  updatedAt: string;
  status: "pending" | "approved" | "rejected";
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

  async function act(path: "approve" | "reject") {
    if (!draft) return;
    const res = await fetch(`/api/admin/blog-drafts/${id}/${path}`, {
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
      {/* Header Information */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{draft.title}</h1>
        <div className="flex items-center justify-center gap-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          <span>By {draft.author}</span>
          <span>•</span>
          <span>{draft.category}</span>
          <span>•</span>
          <span>Submitted {new Date(draft.submittedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>Updated {new Date(draft.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="mt-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            draft.status === 'pending' 
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : draft.status === 'approved'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {draft.status.charAt(0).toUpperCase() + draft.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
          <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Author Details</h3>
          <div className="space-y-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <p><strong>Name:</strong> {draft.author}</p>
            <p><strong>Email:</strong> {draft.email}</p>
            <p><strong>Category:</strong> {draft.category}</p>
            {draft.tags && <p><strong>Tags:</strong> {draft.tags}</p>}
          </div>
        </div>
        
        {draft.coverImage && (
          <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Cover Image</h3>
            <img 
              src={draft.coverImage} 
              alt="Blog cover" 
              className="w-full h-32 object-cover rounded"
            />
          </div>
        )}
      </div>

      {/* Excerpt */}
      <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Brief Excerpt</h3>
        <p style={{ color: 'var(--muted-foreground)' }}>{draft.excerpt}</p>
      </div>

      {/* Actions */}
      {draft.status === 'pending' && (
        <div className="flex items-center justify-center gap-4 mb-8">
          <button 
            className="btn btn-primary text-sm px-6 py-3" 
            onClick={() => act("approve")}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Approve & Publish
          </button>
          <button 
            className="btn btn-outline text-sm px-6 py-3" 
            onClick={() => act("reject")}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Reject Draft
          </button>
        </div>
      )}

      {/* Content */}
      <div className="rounded-2xl p-8 border" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>Blog Content</h2>
        <article className="prose max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-[15px] leading-7 p-6 rounded-lg border" style={{ color: 'var(--foreground)', backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            {draft.content}
          </pre>
        </article>
      </div>
    </div>
  );
}



