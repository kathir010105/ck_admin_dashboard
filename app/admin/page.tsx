import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Admin Dashboard</h1>
        <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>Manage your CK Blogsite administration</p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link href="/admin/users" className="admin-card group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="title">Pending Users</div>
              <div className="description">Review and approve new user registrations</div>
            </div>
            <span className="admin-badge">Users</span>
          </div>
        </Link>
        
        <Link href="/admin/blog-drafts" className="admin-card group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="title">Blog Drafts</div>
              <div className="description">View, publish or delete draft articles</div>
            </div>
            <span className="admin-badge">Drafts</span>
          </div>
        </Link>
      </div>
      
      <div className="text-center pt-8">
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Welcome to your admin dashboard. Select an option above to get started.
        </p>
      </div>
    </div>
  );
}
