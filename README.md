# Full-Stack Authentication System

A production-quality authentication system built with **Next.js + Express.js + JWT + Email Verification**.

## Tech Stack

### Client
- **Next.js 16** (App Router)
- **TailwindCSS v4** with custom primary color `#E96326`
- **TanStack Query** for server state management
- **Axios** for HTTP requests
- **Google Fonts**: Space Grotesk (headings) + Poppins (body)

### Server
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **bcryptjs** for password hashing
- **jsonwebtoken** for JWT authentication
- **nodemailer** for email verification

---

## Project Structure

```
├── client/                     # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/          # Login page
│   │   │   ├── register/       # Register page
│   │   │   ├── verify-email/   # Email verification page
│   │   │   ├── profile/        # Protected profile page
│   │   │   ├── layout.tsx      # Root layout with fonts & providers
│   │   │   └── globals.css     # Tailwind + theme variables
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   ├── lib/
│   │   │   ├── axios.ts        # Axios instance
│   │   │   └── auth.ts         # Token helpers
│   │   └── providers/
│   │       └── QueryProvider.tsx
│
└── server/                     # Express.js backend
    ├── controllers/
    │   ├── authController.js   # register, verifyEmail, login
    │   └── profileController.js
    ├── models/
    │   └── User.js             # Mongoose user schema
    ├── routes/
    │   ├── authRoutes.js
    │   └── profileRoutes.js
    ├── middleware/
    │   └── authMiddleware.js   # JWT verification
    ├── utils/
    │   └── emailUtil.js        # Nodemailer email sender
    └── server.js
```

---

## Setup & Running

### 1. Server Setup

```bash
cd server
```

Create a `.env` file (already provided):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth-system
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:3000
```

> **Gmail Setup**: Enable 2FA on your Google account and generate an [App Password](https://myaccount.google.com/apppasswords). Use that as `EMAIL_PASS`.

Start the server:
```bash
npm run dev   # development with nodemon
npm start     # production
```

### 2. Client Setup

```bash
cd client
npm run dev
```

Client runs at `http://localhost:3000`  
Server runs at `http://localhost:5000`

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register new user | No |
| `GET` | `/api/auth/verify/:token` | Verify email | No |
| `POST` | `/api/auth/login` | Login user | No |
| `GET` | `/api/profile` | Get user profile | JWT |

---

## Authentication Flow

1. **Register** → password hashed → user saved with `isVerified: false` → verification email sent
2. **Email Verification** → click link → JWT token verified → `isVerified: true`
3. **Login** → credentials checked → `isVerified` enforced → JWT returned → stored in `localStorage`
4. **Profile** → JWT sent in `Authorization: Bearer <token>` header → profile data returned via TanStack Query

---

## Features

- ✅ User registration with form validation
- ✅ Secure password hashing (bcrypt)
- ✅ Email verification via Nodemailer
- ✅ JWT-based authentication (7-day expiry)
- ✅ Protected profile route
- ✅ TanStack Query for server state
- ✅ Modern UI with `#E96326` primary color
- ✅ Space Grotesk + Poppins typography
- ✅ Responsive, accessible forms
