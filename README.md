# Authentication & Authorization(Next.js, Express.js, MongoDB)

A production-ready, full-stack authentication system featuring **JWT-based auth**, **email verification**, and a polished, responsive UI.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, Space Grotesk + Poppins (Google Fonts) |
| Data Fetching | TanStack Query v5, Axios |
| Backend | Node.js, Express.js v5 |
| Database | MongoDB, Mongoose v9 |
| Auth | JWT (jsonwebtoken v9), bcryptjs v3 |
| Email | Nodemailer v8 (Gmail) |
| Deployment | Vercel (client) · Render (server) |

---

## Features

- **Register** with name, email, and password — password hashed with bcrypt
- **Email verification** — branded HTML email sent via Nodemailer; unverified accounts cannot log in
- **JWT login** — 7-day token stored in `localStorage`
- **Protected profile** — TanStack Query fetches user data with Bearer token; redirects to login if unauthenticated
- **Responsive UI** — non-scrollable home page, mobile-first auth pages with shared Card/Button/Input components
- **Password visibility toggle** on all password inputs
- **Per-route page titles** with `"%s — AuthSystem"` template + custom favicon
- **Production CORS** — server whitelist includes both `localhost:3000` and the deployed frontend

---

## Project Structure

```
├── client/                         # Next.js frontend
│   └── src/
│       ├── app/
│       │   ├── page.tsx            # Home / hero page
│       │   ├── layout.tsx          # Root layout (fonts, QueryProvider, metadata)
│       │   ├── globals.css         # Tailwind v4 theme (@theme inline)
│       │   ├── icon.tsx            # Favicon (Next.js ImageResponse)
│       │   ├── login/
│       │   │   ├── page.tsx
│       │   │   └── layout.tsx      # Title: "Sign In — AuthSystem"
│       │   ├── register/
│       │   │   ├── page.tsx
│       │   │   └── layout.tsx      # Title: "Create Account — AuthSystem"
│       │   ├── verify-email/
│       │   │   ├── page.tsx
│       │   │   └── layout.tsx      # Title: "Verify Email — AuthSystem"
│       │   └── profile/
│       │       ├── page.tsx        # Protected — requires JWT
│       │       └── layout.tsx      # Title: "My Profile — AuthSystem"
│       ├── components/
│       │   ├── Button.tsx          # Loading state, rounded-md
│       │   ├── Input.tsx           # Password eye toggle, validation styles
│       │   └── Card.tsx            # Page card wrapper
│       ├── lib/
│       │   ├── axios.ts            # Axios instance (baseURL from env)
│       │   └── auth.ts             # getToken / setToken / removeToken helpers
│       └── providers/
│           └── QueryProvider.tsx   # TanStack Query client provider
│
└── server/                         # Express.js backend
    ├── controllers/
    │   ├── authController.js       # register · verifyEmail · login
    │   └── profileController.js    # getProfile
    ├── models/
    │   └── User.js                 # { name, email, password, isVerified, timestamps }
    ├── routes/
    │   ├── authRoutes.js           # /api/auth/*
    │   └── profileRoutes.js        # /api/profile
    ├── middleware/
    │   └── authMiddleware.js       # JWT verification — attaches req.userId
    ├── utils/
    │   └── emailUtil.js            # Nodemailer + branded HTML email
    ├── CHANGELOG.md                # Full API documentation
    └── server.js                   # App entry point
```

---

## Authentication Flow

```
Register ──► Hash password ──► Save user (isVerified: false) ──► Send verification email
                                                                         │
                                                                   User clicks link
                                                                         │
                                                               Verify email token
                                                                         │
                                                               isVerified = true
                                                                         │
Login ──► Check credentials ──► Enforce isVerified ──► Return JWT (7d) ──► Store in localStorage
                                                                         │
Profile ──► Bearer token ──► authMiddleware ──► Return user data (TanStack Query)
```

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register a new user | — |
| `GET` | `/api/auth/verify/:token` | Verify email address | — |
| `POST` | `/api/auth/login` | Log in, returns JWT | — |
| `GET` | `/api/profile` | Get authenticated user's profile | `Bearer <token>` |

For detailed request/response shapes see [server/CHANGELOG.md](server/CHANGELOG.md).

---

## Local Setup

### Prerequisites

- Node.js ≥ 18
- MongoDB running locally (or a MongoDB Atlas URI)
- A Gmail account with an [App Password](https://myaccount.google.com/apppasswords)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/AuthenticationAndAuthorization.git
cd AuthenticationAndAuthorization
```

### 2. Server

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/fs-auth
JWT_SECRET=your_super_secret_jwt_key_change_in_production
EMAIL_USER=you@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:3000
```

> **JWT_SECRET:** generate a strong random string — e.g. `openssl rand -base64 32`
>
> **EMAIL_PASS:** enable 2FA on your Google account, then generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

```bash
npm run dev      # development (nodemon, hot-reload)
npm start        # production
```

Server listens at `http://localhost:5000`

### 3. Client

```bash
cd client
npm install
```

Create `client/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
npm run dev      # development
npm run build    # production build
npm start        # serve production build
```

Client runs at `http://localhost:3000`

---

## Deployment

### Environment variables in production

**Server (Render):**

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | A secure random string |
| `EMAIL_USER` | Your Gmail address |
| `EMAIL_PASS` | Your Gmail App Password |
| `CLIENT_URL` | `http://localhost:3000` |

**Client (Vercel):**

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000` |

---

## Scripts Reference

| Directory | Command | Description |
|-----------|---------|-------------|
| `server/` | `npm run dev` | Start with nodemon (hot-reload) |
| `server/` | `npm start` | Start for production |
| `client/` | `npm run dev` | Next.js dev server |
| `client/` | `npm run build` | Production build |
| `client/` | `npm start` | Serve production build |
| `client/` | `npm run lint` | ESLint check |

---

## License

MIT
