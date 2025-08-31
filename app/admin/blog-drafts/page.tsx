"use client";

import { useEffect, useState } from "react";

type BlogDraft = {
  id: string;
  title: string;
  author: string;
  updatedAt: string;
};

export default function BlogDraftsPage() {
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<BlogDraft[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blog-drafts", { cache: "no-store" });
      const data = await res.json();
      setDrafts(data.drafts ?? []);
    } catch (_error: unknown) {
      setError("Failed to load drafts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function act(path: string, id: string) {
    const prev = drafts;
    try {
      // optimistic removal
      setDrafts((d) => d.filter((x) => x.id !== id));
      const res = await fetch(`/api/admin/blog-drafts/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
    } catch (_error: unknown) {
      setDrafts(prev);
      alert("Action failed");
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Blog Drafts</h1>
        <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>Manage and publish draft articles</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          {drafts.length} draft{drafts.length !== 1 ? 's' : ''} available
        </div>
        <button onClick={load} className="btn btn-outline">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="text-lg loading-state">Loading blog drafts...</div>
        </div>
      )}
      
      {error && (
        <div className="text-center py-8">
          <div className="text-lg error-message p-4 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {!loading && drafts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-lg empty-state">No blog drafts available.</div>
          <p className="mt-2" style={{ color: 'var(--muted-foreground)' }}>All drafts have been processed or published.</p>
        </div>
      )}

      {!loading && drafts.length > 0 && (
        <div className="overflow-hidden table-card">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Updated</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drafts.map((d) => (
                <tr key={d.id}>
                  <td className="font-medium" style={{ color: 'var(--foreground)' }}>
                    <a className="hover:text-blue-600 transition-colors" href={`/admin/blog-drafts/${d.id}`}>
                      {d.title}
                    </a>
                  </td>
                  <td style={{ color: 'var(--muted-foreground)' }}>{d.author}</td>
                  <td style={{ color: 'var(--muted-foreground)' }}>{new Date(d.updatedAt).toLocaleDateString()}</td>
                  <td className="text-center">
                    <div className="inline-flex gap-3">
                      <button
                        onClick={() => act("publish", d.id)}
                        className="btn btn-primary text-sm px-4 py-2"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Publish
                      </button>
                      <button
                        onClick={() => act("delete", d.id)}
                        className="btn btn-danger text-sm px-4 py-2"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
