import Link from "next/link";
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <nav className="sticky top-0 z-10 border-b shadow-sm" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image
                  src="/logo.png"
                  alt="CK Blogsite Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>Admin</span>
                <span className="text-sm ml-2" style={{ color: 'var(--muted-foreground)' }}>Dashboard</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link className="btn btn-outline text-sm" href="/admin">Home</Link>
              <Link className="btn btn-outline text-sm" href="/admin/users">Users</Link>
              <Link className="btn btn-outline text-sm" href="/admin/blog-drafts">Drafts</Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
      
      <main className="relative z-[1] max-w-7xl mx-auto w-full p-8">
        <div className="card p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
