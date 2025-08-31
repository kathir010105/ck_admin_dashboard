import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-md w-full">
        <div className="card p-8 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Image
              src="/logo.png"
              alt="CK Blogsite Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Welcome to CK Blogsite</h1>
          <p className="mb-8" style={{ color: 'var(--muted-foreground)' }}>Your content management platform</p>
          
          <div className="space-y-4">
            <Link 
              href="/admin" 
              className="w-full btn btn-primary py-3 px-6 text-base font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Access Admin Dashboard
            </Link>
            
            <Link 
              href="/admin/users" 
              className="w-full btn btn-outline py-3 px-6 text-base font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Manage Users
            </Link>
            
            <Link 
              href="/admin/blog-drafts" 
              className="w-full btn btn-outline py-3 px-6 text-base font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Review Drafts
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              By accessing the admin dashboard, you agree to our{" "}
              <a href="#" className="hover:underline" style={{ color: 'var(--primary)' }}>Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="hover:underline" style={{ color: 'var(--primary)' }}>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
