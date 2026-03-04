# Full-Stack Next.js Project

This project is a full-stack application built with Next.js, Prisma ORM, and Auth.js. It supports multi-role authentication and permission management, uses a PostgreSQL database hosted on Neon, and is deployed on Vercel. Authentication includes credentials and GitHub provider support.

# Features

Full-stack Next.js application

Database ORM with Prisma

PostgreSQL database via Neon

Authentication & authorization with Auth.js

Multi-role access control

GitHub OAuth login

Credentials-based authentication

Deployment-ready for Vercel

# Tech Stack

Frontend & Backend: Next.js

ORM: Prisma

Database: PostgreSQL (Neon)

Authentication: Auth.js

Hosting: Vercel

Version Control: Git & GitHub

# Setup

1. Clone the repository

cd project-folder

2. Install dependencies
   `npm install`

or

`pnpm install`

3. Configure Environment Variables

# Create a .env file:

DATABASE_URL="your-neon-postgres-url"
AUTH_SECRET="your-secret-key"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

4. Run Prisma Migrations
   `npx prisma migrate dev`

5. Start Development Server
   `npm run dev`

The app will be available at: [http://localhost:3000]

# Deployment

Deploy easily on Vercel:

vercel

Make sure environment variables are configured in the Vercel dashboard.

# Authentication

This project uses Auth.js with:

Credentials login

GitHub OAuth

Role-based permissions

# Database

The database is powered by PostgreSQL on Neon with Prisma ORM for data modeling and queries.

License

MIT
