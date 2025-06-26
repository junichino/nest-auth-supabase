# NestJS Supabase Authentication API

A complete authentication API built with NestJS and Supabase, featuring JWT-based authentication, comprehensive user management, and interactive API documentation.

## 🚀 Features

- 🔐 **User Registration (Signup)** - Create new accounts with email verification
- 🔑 **User Login** - Secure authentication with JWT tokens
- 📧 **Email Confirmation** - Automatic email verification
- 🔄 **Resend Confirmation Email** - Resend verification emails
- 🔒 **Password Reset** - Secure password reset functionality
- 👤 **Get User Profile** - Retrieve authenticated user information
- 🔄 **Token Refresh** - Refresh expired access tokens
- 🚪 **Sign Out** - Secure logout functionality
- 🛡️ **JWT Token Validation** - Supabase-powered authentication
- ✅ **Input Validation** - Comprehensive request validation
- 📚 **Swagger UI** - Interactive API documentation
- 🔐 **Bearer Authentication** - Industry-standard auth headers

## 🛠️ Tech Stack

- **NestJS** - Progressive Node.js framework
- **Supabase** - Backend as a service with built-in auth
- **TypeScript** - Type safety and better developer experience
- **Class Validator** - Elegant input validation
- **Swagger/OpenAPI** - API documentation and testing
- **JWT** - Secure token-based authentication

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/junichino/nest-auth-supabase.git
cd nest-auth-supabase

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy the example environment file
cp .env.example .env
# On Windows: copy .env.example .env
```

### 3. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** in your Supabase dashboard
3. Copy your credentials to `.env`:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your_actual_supabase_anon_key

# Application
PORT=3000
NODE_ENV=development
```

### 4. Run the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## 🌐 Access Points

Once the application is running:

- **API Base URL**: http://localhost:3000/api
- **Swagger Documentation**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/health

## 📚 API Documentation

### Interactive Swagger UI

Visit http://localhost:3000/api/docs to access the interactive API documentation where you can:

✅ View all available endpoints  
✅ Test APIs directly in the browser  
✅ See request/response schemas  
✅ Try authentication flows  
✅ Copy example requests  

### Available Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| **Authentication** |
| POST | `/api/auth/signup` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/confirm-register` | Confirm email registration | ❌ |
| POST | `/api/auth/resend-confirmation` | Resend confirmation email | ❌ |
| POST | `/api/auth/reset-password` | Request password reset | ❌ |
| POST | `/api/auth/refresh` | Refresh access token | ❌ |
| GET | `/api/auth/profile` | Get user profile | ✅ |
| POST | `/api/auth/signout` | Sign out user | ✅ |
| **Health Check** |
| GET | `/api/` | Welcome message | ❌ |
| GET | `/api/health` | Health check | ❌ |

## 🔧 Usage Examples

### 1. Register a New User

```bash
curl -X POST "http://localhost:3000/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### 2. Login

```bash
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### 3. Get Profile (with Bearer token)

```bash
curl -X GET "http://localhost:3000/api/auth/profile" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Refresh Token

```bash
curl -X POST "http://localhost:3000/api/auth/refresh" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

## 🏗️ Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── decorators/         # Custom decorators (@Public, @User)
│   ├── dto/               # Data Transfer Objects
│   ├── guards/            # Auth guards (JWT validation)
│   ├── interfaces/        # TypeScript interfaces
│   ├── strategies/        # Passport strategies
│   ├── auth.controller.ts # Auth endpoints
│   ├── auth.module.ts     # Auth module configuration
│   └── auth.service.ts    # Auth business logic
├── supabase/              # Supabase integration
│   ├── supabase.module.ts # Supabase module
│   └── supabase.service.ts # Supabase client service
├── app.controller.ts      # Root controller
├── app.module.ts          # Root module
├── app.service.ts         # Root service
└── main.ts               # Application entry point
```

## 🛡️ Security Features

- **JWT Token Validation** - All protected routes validate JWT tokens via Supabase
- **Input Validation** - All request bodies are validated using class-validator
- **CORS Protection** - Configurable CORS settings
- **Bearer Authentication** - Industry-standard Authorization headers
- **Environment Variables** - Secure credential management
- **Error Handling** - Comprehensive error responses

## 🔄 Authentication Flow

1. **Registration**: User signs up → Supabase creates account → Email verification sent
2. **Login**: User provides credentials → Supabase validates → Returns JWT tokens
3. **Protected Routes**: Client sends Bearer token → Server validates with Supabase
4. **Token Refresh**: Access token expires → Use refresh token → Get new tokens
5. **Logout**: Client requests signout → Server invalidates session

## 📱 Response Examples

### Success Response (Login)

```json
{
  "user": {
    "id": "80f66dad-a9e9-4ae3-9c32-03d01e0425a6",
    "email": "user@example.com",
    "email_confirmed_at": "2025-06-26T19:27:22.173256Z",
    "user_metadata": {
      "first_name": "John",
      "last_name": "Doe"
    },
    "created_at": "2025-06-26T19:26:57.735706Z",
    "updated_at": "2025-06-26T19:27:46.453493Z"
  },
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600,
    "token_type": "bearer"
  }
}
```

### Error Response

```json
{
  "statusCode": 400,
  "message": "Email address is invalid",
  "error": "Bad Request"
}
```

## 🚀 Deployment

### Using Docker

```bash
# Build image
docker build -t nest-auth-supabase .

# Run container
docker run -p 3000:3000 --env-file .env nest-auth-supabase
```

### Using Node.js

```bash
# Build for production
npm run build

# Start production server
npm run start:prod
```

## 🧪 Testing

Use the included test JSON files:

```bash
# Test signup
curl -X POST "http://localhost:3000/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d @test-signup.json

# Test login  
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d @test-login.json

# Test refresh
curl -X POST "http://localhost:3000/api/auth/refresh" \
  -H "Content-Type: application/json" \
  -d @test-refresh-real.json
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Change port in .env file
   PORT=3002
   ```

2. **Supabase Connection Error**
   - Verify SUPABASE_URL and SUPABASE_ANON_KEY
   - Check Supabase project status

3. **Email Validation Failed**
   - Use real email domains (not example.com)
   - Check Supabase email settings

4. **Token Validation Error**
   - Ensure Bearer token format: `Authorization: Bearer <token>`
   - Check token expiration

## 📖 Learn More

- [NestJS Documentation](https://docs.nestjs.com)
- [Supabase Documentation](https://supabase.com/docs)
- [JWT.io](https://jwt.io) - JWT token decoder
- [Swagger/OpenAPI](https://swagger.io/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- Supabase team for the excellent BaaS platform
- Community contributors and users

---

**Made with ❤️ using NestJS and Supabase**
