"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogSubmission {
  title: string;
  author: string;
  email: string;
  category: string;
  tags: string;
  excerpt: string;
  content: string;
  coverImage?: string;
}

const categories = [
  "Technology",
  "Business",
  "Marketing",
  "Design",
  "Development",
  "Product",
  "Strategy",
  "Innovation",
  "Leadership",
  "Other"
];

export default function SubmitBlogPage() {
  const [formData, setFormData] = useState<BlogSubmission>({
    title: "",
    author: "",
    email: "",
    category: "",
    tags: "",
    excerpt: "",
    content: "",
    coverImage: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/submit-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          title: "",
          author: "",
          email: "",
          category: "",
          tags: "",
          excerpt: "",
          content: "",
          coverImage: ""
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to submit blog");
        setSubmitStatus("error");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen z-10 relative" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <header className="border-b z-10 relative" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4">
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
                <span className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>CK Blogsite</span>
                <span className="text-sm ml-2" style={{ color: 'var(--muted-foreground)' }}>Submit Your Blog</span>
              </div>
            </div>
            <Link 
              href="/" 
              className="btn btn-outline text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 z-10 relative">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Submit Your Blog for Publication
          </h1>
          <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
            Share your knowledge and insights with our community. Your blog will be reviewed by our editorial team.
          </p>
        </div>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="mb-6 p-4 rounded-lg border" style={{ backgroundColor: 'var(--success)', color: 'white', borderColor: 'var(--success)' }}>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Blog submitted successfully!</span>
            </div>
            <p className="mt-2 text-sm opacity-90">
              Thank you for your submission. Our team will review it and get back to you soon.
            </p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="mb-6 p-4 rounded-lg border" style={{ backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground)', borderColor: 'var(--destructive)' }}>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Submission failed</span>
            </div>
            <p className="mt-2 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Blog Submission Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Blog Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ 
                    backgroundColor: 'var(--input)', 
                    color: 'var(--input-foreground)', 
                    borderColor: 'var(--border)' 
                  }}
                  placeholder="Enter your blog title"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ 
                    backgroundColor: 'var(--input)', 
                    color: 'var(--input-foreground)', 
                    borderColor: 'var(--border)' 
                  }}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Author Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Author Name *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ 
                    backgroundColor: 'var(--input)', 
                    color: 'var(--input-foreground)', 
                    borderColor: 'var(--border)' 
                  }}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ 
                    backgroundColor: 'var(--input)', 
                    color: 'var(--input-foreground)', 
                    borderColor: 'var(--border)' 
                  }}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Tags and Cover Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ 
                    backgroundColor: 'var(--input)', 
                    color: 'var(--input-foreground)', 
                    borderColor: 'var(--border)' 
                  }}
                  placeholder="tag1, tag2, tag3 (comma separated)"
                />
                <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                  Separate tags with commas
                </p>
              </div>

              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                  Cover Image URL
                </label>
                <input
                  type="url"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ 
                    backgroundColor: 'var(--input)', 
                    color: 'var(--input-foreground)', 
                    borderColor: 'var(--border)' 
                  }}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                  Optional: Add a cover image for your blog
                </p>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Brief Excerpt *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ 
                  backgroundColor: 'var(--input)', 
                  color: 'var(--input-foreground)', 
                  borderColor: 'var(--border)' 
                }}
                placeholder="A brief summary of your blog (2-3 sentences)"
                required
              />
              <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                This will appear as a preview of your blog
              </p>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Blog Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={12}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                style={{ 
                  backgroundColor: 'var(--input)', 
                  color: 'var(--input-foreground)', 
                  borderColor: 'var(--border)' 
                }}
                placeholder="Write your blog content here. You can use Markdown formatting for better structure."
                required
              />
              <div className="mt-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                <p className="mb-1">Markdown Tips:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><code># Heading</code> for main headings</li>
                  <li><code>## Subheading</code> for subheadings</li>
                  <li><code>**bold**</code> for bold text</li>
                  <li><code>*italic*</code> for italic text</li>
                  <li><code>[link](url)</code> for links</li>
                </ul>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary py-3 px-6 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Blog for Review"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Information Box */}
        <div className="mt-8 p-6 rounded-lg border" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
          <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
            What happens after submission?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">1</span>
              </div>
              <div>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>Review</p>
                <p>Our editorial team reviews your submission for quality and relevance.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">2</span>
              </div>
              <div>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>Feedback</p>
                <p>We&apos;ll provide feedback or request revisions if needed.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">3</span>
              </div>
              <div>
                <p className="font-medium" style={{ color: 'var(--foreground)' }}>Publication</p>
                <p>Once approved, your blog will be published on our platform.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
