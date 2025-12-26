# ML's THC - Todo & User Management API

## Remarks:

### Done:

- Minimum requirement has been reached
- Setup for user model
- Modular Seperation of Concern
- TDD, Unit testable

### Future Improvements:

- Git CI/CD Setup
- User Feature (Routing, Schema) has not been developed
- Authentication (`/v1/users/register` and `/v1/users/login`)
  - JWT Access Token with expiring date
- Authorization : Middleware / preHandler for accessing ToDo
  - adding `ownerID` to model `Todo`
  - Checking Access Token

### Good to have for scalability:

- Caching (Redis)
- Containerize (Docker)

## Features

- ✅ **Todo Management** - Create, read, update, delete todos with priorities and due dates
- 👤 **User Management** - User registration and authentication (To Be Implemented)
- 🔒 **Type-Safe** - Full TypeScript support with Prisma ORM
- 📝 **API Documentation** - Auto-generated Swagger/OpenAPI docs
- 🧪 **Test Coverage** - Comprehensive unit and integration tests
- 🚀 **Fast & Lightweight** - Built on Fastify framework
- 🗄️ **PostgreSQL** - Reliable relational database with Prisma adapter

## Tech Stack

- **Runtime:** Node.js v24+
- **Framework:** Fastify
- **Database:** PostgreSQL
- **ORM:** Prisma with @prisma/adapter-pg
- **Validation:** @sinclair/typebox
- **Documentation:** @fastify/swagger & @fastify/swagger-ui
- **Testing:** Vitest
- **Language:** TypeScript (Strong/Strict Typing)

## Prerequisites

- Node.js >= 24.0.0
- PostgreSQL >= 14
- npm or yarn

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd THC

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Configure your database URL in .env
# DATABASE_URL="postgresql://user:password@localhost:5432/thc"

# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

## Environment Variables

Create a `.env` file in the root directory (Example can be seen in `.env.example`):

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/thc?schema=public"
BASE_URL="http://localhost:3000"
```

## Database Setup

```bash
# Start PostgreSQL (macOS with Homebrew)
brew services start postgresql

# Create database
createdb thc

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

## Running the Application

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm run build
npm start

# Run tests
npm test

# Test coverage
npm run test:coverage
```

## Project Structure

```
THC/
├── prisma/
│   ├── migrations/        # Database migrations
│   └── schema.prisma      # Prisma schema
├── src/
│   ├── api/
│   │   └── v1/
│   │       ├── todos/     # Todo routes, handlers, schemas
│   │       └── users/     # User routes, handlers, schemas
│   ├── config/
│   │   ├── env.ts         # Environment configuration
│   │   └── vitest.ts      # Vitest Testing Configuration
│   ├── constant/
│   │   ├── api-tags.ts    # Swagger tags
│   │   └── http-status.ts # HTTP status codes
│   ├── plugins/
│   │   ├── prisma.ts      # Prisma client plugin
│   │   ├── repositories.ts # Repository injection
│   │   └── swagger.ts     # Swagger configuration
│   ├── app.ts             # Fastify app builder
│   └── server.ts          # Server entry point
├── .env                   # Environment variables
└── package.json
```

## API Documentation

Once the server is running, visit:

- **Swagger UI:** http://localhost:3000/docs
- **API (V1) Endpoint:** http://localhost:3000/v1

## API Endpoints

### Todos

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | `/v1/todos`     | Get all todos    |
| GET    | `/v1/todos/:id` | Get todo by ID   |
| POST   | `/v1/todos`     | Create new todo  |
| PATCH  | `/v1/todos/:id` | Update todo      |
| DELETE | `/v1/todos/:id` | Soft delete todo |

### Users

N/A

## Data Models

Can be seen at `prisma/schema.prisma`

### Todo

```typescript
{
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
```

### User

```typescript
{
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Example Usage

Refer to `localhost:3000/docs`

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory.

## Scripts

| Command                   | Description                              |
| ------------------------- | ---------------------------------------- |
| `npm run dev`             | Start development server with hot reload |
| `npm run build`           | Build for production                     |
| `npm start`               | Start production server                  |
| `npm test`                | Run tests                                |
| `npm run test:coverage`   | Generate test coverage report            |
| `npm run prisma:generate` | Generate Prisma Client                   |
| `npm run prisma:migrate`  | Run database migrations                  |
| `npm run prisma:studio`   | Open Prisma Studio GUI                   |

## Development

### Adding a New Feature

1. Create Prisma model in `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name feature_name`
3. Create route folder in `src/api/v1/feature/`
4. Implement:
   - `feature.routes.ts` - Route definitions
   - `feature.schema.ts` - Schemas header
   - `feature.request.ts` - Feature Request & Body
   - `feature.response.ts` - Feature Response
   - `feature.repository.ts` - Database (+ Prisma ORM) operations definition
     - Inject feature's repository in `src/plugins/repositories.ts`
   - `feature.handler.ts` - API Endpoint orchestrator
5. Register routes in `src/api/v1/index.ts`
6. Write tests

## Troubleshooting

### Prisma Connection Issues

```bash
# Verify PostgreSQL is running
brew services list

# Check database exists
psql -l

# Regenerate Prisma Client
npx prisma generate

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

### Port Already in Use

Change `PORT` in `.env` or kill the process:

```bash
lsof -ti:3000 | xargs kill -9
```

## Made For

ML's THC
Assignment: Todo List API (Backend Internship Test)

## Author & Contact

William

whcs.william@gmail.com
