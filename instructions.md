# FULL STACK AUTHENTICATION SYSTEM (NEXT.JS + JWT + EMAIL VERIFICATION)

You are a **senior full-stack engineer**.

Build a **clean, production-quality authentication system** based on the assignment requirements.

The project must be structured clearly and implemented completely in **one pass**.

---

# PROJECT STACK

client
- Next.js (App Router)
- TailwindCSS
- TanStack Query
- Axios

server
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Email Verification using Nodemailer

---

# UI DESIGN REQUIREMENTS

## Color Theme

Primary Color
#E96326


Use it for:
- Buttons
- Highlights
- Active states
- Links
- Accent elements

Create Tailwind theme extension.

Example:
primary: "#E96326"


---

## Fonts

Use Google Fonts.

Headings
Space Grotesk


Body


Poppins


Apply globally.

Example typography rules:


h1,h2,h3,h4,h5,h6 → Space Grotesk
p,span,input,label → Poppins


---

# UI PAGES

Create modern minimal UI.

Pages required:


/login
/register
/verify-email
/profile


---

# PAGE DETAILS

## Register Page

Fields


Name
Email
Password


Button


Create Account


Behavior


POST /api/auth/register


After success:


Show message:
"Verification email sent. Please verify your email."


---

## Email Verification Page

Route


/verify-email?token=...


Behavior


Call backend verification endpoint
Show success message
Redirect to login


---

## Login Page

Fields


Email
Password


Behavior


POST /api/auth/login


Response


JWT token


Store token in


localStorage


After login:


redirect to /profile


---

## Profile Page (Protected)

Route


/profile


Requirements


Must be protected
Only accessible if token exists


Fetch user profile using **TanStack Query**.

---

# FRONTEND DATA FETCHING (TanStack Query)

Example structure


const { data, isLoading } = useQuery({
queryKey: ["profile"],
queryFn: () =>
axios.get("/api/profile", {
headers: {
Authorization: Bearer ${token},
},
}),
});


Benefits


Automatic caching
Background refetching
Error handling


Display:


User name
User email


---

# BACKEND IMPLEMENTATION

Use Express server inside `/server`.

Folder structure


server
├ controllers
├ models
├ routes
├ middleware
├ utils
└ server.js


---

# DATABASE MODEL

User Schema


{
name: String,
email: String,
password: String,
isVerified: Boolean
}


Rules


Password must be hashed
Never store plain text password


Use


bcrypt


---

# AUTHENTICATION FLOW

## Registration

Endpoint


POST /api/auth/register


Steps


hash password
save user
isVerified = false
generate verification token
send verification email


---

## Email Verification

Endpoint


GET /api/auth/verify/:token


Steps


verify token
set isVerified = true


---

## Login

Endpoint


POST /api/auth/login


Steps


find user by email
compare password
ensure user.isVerified === true
generate JWT
return token


Example response


{
token: "jwt_token"
}


---

# JWT IMPLEMENTATION

JWT contains


userId
email


Secret stored in


.env


Frontend sends token in header


Authorization: Bearer <token>


---

# AUTHORIZATION MIDDLEWARE

Create middleware


authMiddleware


Steps


read token from header
verify token
attach userId to request


If invalid


return 401 Unauthorized


---

# PROTECTED ROUTE

Endpoint


GET /api/profile


Middleware


authMiddleware


Response


{
name,
email
}


---

# ACCESS CONTROL RULES

Rules


Logged in users can access /profile
Unauthenticated users redirected to /login
Invalid token rejected


---

# ERROR HANDLING

Handle cases


invalid login
missing token
invalid token
email not verified


Return proper status codes.

---

# PROJECT STRUCTURE


project-root
│
├ app
│ ├ login
│ ├ register
│ ├ profile
│ └ verify-email
│
├ components
│ ├ Button
│ ├ Input
│ ├ Card
│
├ lib
│ ├ axios
│ ├ auth
│
├ server
│
├ styles
│
├ .env


---

# DESIGN STYLE

Make UI modern

Use


rounded-xl
soft shadows
large spacing
clean forms


Buttons


bg-primary
hover:opacity-90


Inputs


focus:ring-primary


---

# FINAL GOAL

The finished system must demonstrate:


User registration
Email verification
JWT authentication
Protected routes
Profile page
TanStack Query server state management
Secure password hashing
Modern UI


---

# OUTPUT REQUIREMENT

Generate the **complete project code** with:


All files
All folders
Full implementation
Ready to run