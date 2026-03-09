# API Documentation — Auth System

Base URL: `http://localhost:5000`

All request bodies must be sent as `application/json`.
All responses are `application/json`.

---

## Auth Routes — `/api/auth`

---

### POST `/api/auth/register`

Register a new user. Sends a verification email with a JWT token link.

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

| Field      | Type   | Required | Validation              |
|------------|--------|----------|-------------------------|
| `name`     | String | Yes      | Non-empty               |
| `email`    | String | Yes      | Valid email format      |
| `password` | String | Yes      | Any non-empty string    |

#### Success Response — `201 Created`

```json
{
  "message": "Verification email sent. Please verify your email."
}
```

#### Error Responses

| Status | Condition                        | Response Body                                    |
|--------|----------------------------------|--------------------------------------------------|
| `400`  | Missing required fields          | `{ "message": "All fields are required." }`      |
| `409`  | Email already registered         | `{ "message": "Email already registered." }`     |
| `500`  | Server / email sending error     | `{ "message": "Internal server error." }`        |
| `503`  | MongoDB not connected            | `{ "message": "Service unavailable: database is not connected. Please try again shortly." }` |

---

### GET `/api/auth/verify/:token`

Verifies user's email using the JWT token from the email link.

#### URL Parameter

| Param   | Type   | Description                            |
|---------|--------|----------------------------------------|
| `token` | String | JWT token received in the email link   |

#### Example

```
GET /api/auth/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Success Response — `200 OK`

```json
{
  "message": "Email verified successfully."
}
```

If already verified:

```json
{
  "message": "Email already verified."
}
```

#### Error Responses

| Status | Condition                    | Response Body                                               |
|--------|------------------------------|-------------------------------------------------------------|
| `400`  | Invalid or expired token     | `{ "message": "Invalid or expired verification token." }`   |
| `404`  | User not found               | `{ "message": "User not found." }`                          |
| `500`  | Server error                 | `{ "message": "Internal server error." }`                   |
| `503`  | MongoDB not connected        | `{ "message": "Service unavailable: database is not connected. Please try again shortly." }` |

---

### POST `/api/auth/login`

Login with email and password. Returns a JWT token on success.

#### Request Body

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

| Field      | Type   | Required |
|------------|--------|----------|
| `email`    | String | Yes      |
| `password` | String | Yes      |

#### Success Response — `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

The token is a signed JWT with the following payload:

```json
{
  "userId": "64abc123...",
  "email": "john@example.com",
  "iat": 1710000000,
  "exp": 1710604800
}
```

Token expires in **7 days**.

#### Error Responses

| Status | Condition                        | Response Body                                                              |
|--------|----------------------------------|----------------------------------------------------------------------------|
| `400`  | Missing email or password        | `{ "message": "Email and password are required." }`                        |
| `401`  | Wrong email or password          | `{ "message": "Invalid email or password." }`                              |
| `403`  | Email not verified               | `{ "message": "Please verify your email before logging in." }`             |
| `500`  | Server error                     | `{ "message": "Internal server error." }`                                  |
| `503`  | MongoDB not connected            | `{ "message": "Service unavailable: database is not connected. Please try again shortly." }` |

---

## Profile Routes — `/api`

All profile routes require authentication via JWT in the `Authorization` header.

#### Authorization Header Format

```
Authorization: Bearer <token>
```

---

### GET `/api/profile`

Returns the logged-in user's profile data.

**Requires:** `authMiddleware`

#### Headers

| Header          | Value                     | Required |
|-----------------|---------------------------|----------|
| `Authorization` | `Bearer <jwt_token>`      | Yes      |

#### Success Response — `200 OK`

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Error Responses

| Status | Condition                        | Response Body                                                              |
|--------|----------------------------------|----------------------------------------------------------------------------|
| `401`  | No token provided                | `{ "message": "Unauthorized: No token provided." }`                        |
| `401`  | Token invalid or expired         | `{ "message": "Unauthorized: Invalid or expired token." }`                 |
| `404`  | User not found in DB             | `{ "message": "User not found." }`                                         |
| `500`  | Server error                     | `{ "message": "Internal server error." }`                                  |
| `503`  | MongoDB not connected            | `{ "message": "Service unavailable: database is not connected. Please try again shortly." }` |

---

## Authentication Middleware — `authMiddleware`

Applied to all protected routes. Reads the `Authorization` header, verifies the JWT, and attaches `req.userId` and `req.email` to the request object.

**Flow:**
1. Extract `Bearer <token>` from `Authorization` header
2. Verify token signature using `JWT_SECRET`
3. Decode `userId` and `email` from payload
4. Attach to `req` and call `next()`
5. On failure → `401 Unauthorized`

---

## Data Models

### User

```js
{
  name: String,           // required
  email: String,          // required, unique, lowercase
  password: String,       // required, bcrypt hashed (salt rounds: 12)
  isVerified: Boolean,    // default: false
  createdAt: Date,        // auto (timestamps)
  updatedAt: Date         // auto (timestamps)
}
```

---

## Environment Variables

| Variable     | Description                                      | Example                                      |
|--------------|--------------------------------------------------|----------------------------------------------|
| `PORT`       | Port the server listens on                       | `5000`                                       |
| `MONGO_URI`  | MongoDB connection string                        | `mongodb://localhost:27017/auth-system`      |
| `JWT_SECRET` | Secret key for signing JWT tokens                | `your_super_secret_key`                      |
| `EMAIL_USER` | Gmail address used to send verification emails   | `you@gmail.com`                              |
| `EMAIL_PASS` | Gmail App Password (not your account password)   | `abcd efgh ijkl mnop`                        |
| `CLIENT_URL` | Frontend URL for CORS and email links            | `http://localhost:3000`                      |

---

## Changelog

### v1.0.0 — Initial Release

- `POST /api/auth/register` — User registration with email verification
- `GET /api/auth/verify/:token` — Email verification via JWT token
- `POST /api/auth/login` — Login with email/password, returns JWT
- `GET /api/profile` — Protected profile endpoint using `authMiddleware`
- MongoDB `User` model with bcrypt password hashing
- Nodemailer integration for verification emails
- `503` error response when MongoDB is not connected
