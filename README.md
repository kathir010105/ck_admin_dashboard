# CK Admin Dashboard

A modern, responsive admin dashboard built with Next.js 14, TypeScript, and Tailwind CSS for managing blog content and user administration.

## 🚀 Features

- **Blog Management**: Submit, review, and manage blog drafts
- **User Administration**: Approve, reject, and manage user accounts
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Built-in theme switching capability
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **TypeScript**: Full type safety and better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **State Management**: React Hooks
- **API**: Next.js API Routes

## 📁 Project Structure

```
ck_admin_dashboard/
├── app/
│   ├── admin/           # Admin dashboard pages
│   │   ├── blog-drafts/ # Blog draft management
│   │   └── users/       # User management
│   ├── api/             # API endpoints
│   ├── submit-blog/     # Blog submission form
│   └── layout.tsx       # Root layout
├── components/          # Reusable components
├── lib/                 # Utility functions
└── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd ck_admin_dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Pages & Features

### Landing Page (`/`)

- Welcome screen with navigation to admin areas
- Quick access to blog submission and user management

### Blog Submission (`/submit-blog`)

- User-friendly form for submitting blog content
- Support for categories, tags, and cover images
- Markdown formatting support

### Admin Dashboard (`/admin`)

- Protected admin area for content management
- Blog draft review and approval system
- User account management

### Blog Drafts (`/admin/blog-drafts`)

- Review pending blog submissions
- Approve or reject content
- Manage draft status

### User Management (`/admin/users`)

- View all user accounts
- Approve pending registrations
- Manage user permissions

## 🎨 Customization

### Themes

The dashboard includes a built-in theme system with CSS custom properties:

- Light and dark mode support
- Customizable color schemes
- Consistent design tokens

### Styling

- Built with Tailwind CSS for rapid development
- Responsive design patterns
- Custom component classes

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Consistent component structure
- Responsive design principles

## 📦 API Endpoints

- `POST /api/submit-blog` - Submit new blog content
- `GET /api/admin/blog-drafts` - Get pending blog drafts
- `POST /api/admin/blog-drafts/[id]/approve` - Approve blog draft
- `POST /api/admin/blog-drafts/[id]/reject` - Reject blog draft
- `GET /api/admin/users` - Get user list
- `POST /api/admin/users/[id]/approve` - Approve user account

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code examples

---

Built with ❤️ using Next.js and Tailwind CSS
