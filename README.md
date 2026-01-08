# Task Management System - Backend API

Complete Node.js + TypeScript + Prisma backend with JWT authentication for task management.

## 🚀 Features

✅ **JWT Authentication** - Access & Refresh tokens  
✅ **User Management** - Registration, Login, Logout  
✅ **Task CRUD** - Create, Read, Update, Delete tasks  
✅ **Advanced Filtering** - Pagination, status filter, search  
✅ **PostgreSQL Database** - With Prisma ORM  
✅ **Password Security** - bcrypt hashing  
✅ **Error Handling** - Proper HTTP status codes  
✅ **TypeScript** - Full type safety  

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- npm or yarn package manager

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Amansingh80/task-management-backend-complete.git
cd task-management-backend-complete
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/taskmanagement?schema=public"
JWT_ACCESS_SECRET=your-super-secret-access-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
PORT=3001
NODE_ENV=development
```

**Important:** Replace `postgres:password` with your actual PostgreSQL credentials.

### 4. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init
```

### 5. Start Development Server

```bash
npm run dev
```

Server will start on **http://localhost:3001** 🎉

## 🎯 Running in IntelliJ IDEA

1. **Open IntelliJ IDEA**
2. **File → Open** → Select the project folder
3. **Open Terminal** (Alt+F12 or View → Tool Windows → Terminal)
4. Run the setup commands above
5. Use the built-in terminal to run `npm run dev`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout user |

### Tasks (Protected - Requires Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (with pagination, filter, search) |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create new task |
| PATCH | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| POST | `/api/tasks/:id/toggle` | Toggle task status |

### Query Parameters for GET /api/tasks

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status: PENDING, IN_PROGRESS, COMPLETED, ALL
- `search` - Search by title

## 🧪 Testing the API

### Register a User

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Response includes:**
- `accessToken` - Use for API requests (expires in 15 minutes)
- `refreshToken` - Use to get new access token (expires in 7 days)

### Create a Task

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README",
    "status": "PENDING"
  }'
```

### Get All Tasks

```bash
curl http://localhost:3001/api/tasks?page=1&limit=10&status=PENDING \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Update a Task

```bash
curl -X PATCH http://localhost:3001/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "Updated title",
    "status": "IN_PROGRESS"
  }'
```

### Toggle Task Status

```bash
curl -X POST http://localhost:3001/api/tasks/TASK_ID/toggle \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Delete a Task

```bash
curl -X DELETE http://localhost:3001/api/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 📁 Project Structure

```
task-management-backend-complete/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/
│   │   └── database.ts        # Prisma client configuration
│   ├── controllers/
│   │   ├── auth.controller.ts # Authentication logic
│   │   └── task.controller.ts # Task CRUD logic
│   ├── middleware/
│   │   ├── auth.middleware.ts # JWT verification
│   │   └── error.middleware.ts # Error handling
│   ├── routes/
│   │   ├── auth.routes.ts     # Auth endpoints
│   │   └── task.routes.ts     # Task endpoints
│   ├── types/
│   │   └── express.d.ts       # TypeScript type definitions
│   ├── utils/
│   │   └── jwt.util.ts        # JWT helper functions
│   └── index.ts               # Application entry point
├── .env                       # Environment variables (create this)
├── .env.example               # Environment template
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Run production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio (database GUI)
```

## 🗄️ Database Schema

### User Model
- `id` - UUID (Primary Key)
- `email` - String (Unique)
- `password` - String (Hashed)
- `name` - String (Optional)
- `createdAt` - DateTime
- `updatedAt` - DateTime

### Task Model
- `id` - UUID (Primary Key)
- `title` - String
- `description` - String (Optional)
- `status` - Enum (PENDING, IN_PROGRESS, COMPLETED)
- `userId` - UUID (Foreign Key)
- `createdAt` - DateTime
- `updatedAt` - DateTime

### RefreshToken Model
- `id` - UUID (Primary Key)
- `token` - String (Unique)
- `userId` - UUID (Foreign Key)
- `expiresAt` - DateTime
- `createdAt` - DateTime

## 🔐 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Tokens** - Separate access and refresh tokens
- **Token Expiry** - Short-lived access tokens (15 min)
- **Refresh Mechanism** - Long-lived refresh tokens (7 days)
- **Protected Routes** - Authentication middleware
- **Input Validation** - express-validator
- **Error Handling** - Proper HTTP status codes

## 🐛 Troubleshooting

### Database Connection Error

Make sure PostgreSQL is running and credentials in `.env` are correct:

```bash
# Check PostgreSQL status
# Windows: Check Services
# Mac: brew services list
# Linux: sudo systemctl status postgresql
```

### Port Already in Use

Change the PORT in `.env` file:

```env
PORT=3002
```

### Prisma Client Not Generated

Run:

```bash
npx prisma generate
```

## 📖 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/)
- [JWT.io](https://jwt.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📝 License

MIT License - Feel free to use this project for learning and development.

## 👨‍💻 Author

Created for Software Engineering Assessment

---

**Happy Coding! 🚀**