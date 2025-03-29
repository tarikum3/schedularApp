Scheduler Application
Overview
This is a Next.js-based scheduling application with a comprehensive feature set for managing appointments, user authentication, and data visualization. The application utilizes modern React libraries and integrates with various backend services.

Key Features
Core Functionality
Appointment Management: Comprehensive system for creating and managing appointments

Calendar Integration: Scheduling capabilities with date range selection

User Management
Authentication: Secure user authentication system

Form Validation: Robust form handling with validation

Data Handling
State Management: Redux-based state management

Database Integration: Prisma ORM for database operations

UI Components
Material UI: Comprehensive UI component library

Responsive Design: Tailwind CSS for styling

Theme Support: Dark/light mode theming (next-themes)

Internationalization
Multi-language support (english and amharic)

Development Setup
Prerequisites
Node.js (version compatible with package.json)

PostgreSQL (or other Prisma-supported database)

Optional: Supabase account if using Supabase features

Installation
Clone the repository

Install dependencies:

bash
Copy
npm install
Set up environment variables (see .env.example for required variables)

Run database migrations:

bash
Copy
npx prisma migrate dev
Scripts
npm run dev: Start development server

npm run build: Create production build

npm run start: Start production server

npm run vercel-build: Build command for Vercel deployment (includes Prisma setup)

npm run lint: Run ESLint

Deployment
The application includes Vercel-specific build scripts and can be deployed to Vercel or other platforms supporting Next.js applications. Ensure database connection strings and authentication providers are properly configured in production environment variables.

Technology Stack
Frontend: Next.js 14, React 18

Styling: Material UI, Tailwind CSS

State Management: Redux Toolkit

Database: Prisma ORM (PostgreSQL recommended)

Authentication: NextAuth.js

Internationalization: next-intl

License
