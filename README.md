# NestJS Backend Test Task

This project is a RESTful API service built with NestJS, TypeScript, Prisma, and GraphQL. It provides user authentication features including registration, standard login, and biometric login, secured with JWT (JSON Web Tokens).

## Features

- User registration with email and password.
- Standard login with email and password.
- Biometric login using a unique biometric key.
- JWT-based authentication for secure access.
- GraphQL API with auto-generated schema and Playground for testing.

## Prerequisites

- **Node.js**: Version 20.x or higher (tested with v20.15.0).
- **Yarn**: Version 1.22.x or higher (tested with v1.22.22).
- **PostgreSQL**: Version 13.x or higher, installed locally with pgAdmin (tested with v14).
- **Windows**: Instructions are tailored for Windows; adjust for other OS if needed.

## Project Structure

nestjs-backend-test/
├── src/
│ ├── auth/ # Authentication module (service, resolver, strategy)
│ ├── users/ # Users module (service, resolver)
│ ├── prisma/ # Prisma service and schema
│ ├── app.module.ts # Root module
│ └── main.ts # Application entry point
├── prisma/
│ └── schema.prisma # Prisma schema file
├── .env # Environment variables
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── README.md # This file

## Setup Instructions

### 1. Install PostgreSQL

- Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/).
- During installation:
  - Set a password for the `postgres` user (e.g., `password`).
  - Use the default port (5432).
- PostgreSQL should start automatically (check Services app: `postgresql-x64-14`).

### 2. Set Up the Database with pgAdmin

- Open pgAdmin (installed with PostgreSQL).
- Log in with the `postgres` user and your installation password.
- Create the database:
  - Right-click **Databases** > **Create** > **Database**.
  - Name: `test`, click **Save**.

### 3. Clone the Repository


git clone https://github.com/charly-com/nestjs-backend-test
cd nestjs-backend-test

### 4. Install Dependencies

yarn install

### 5. Configure Environment Variables
Copy .env.example to .env (create .env.example if not present):
cmd

copy .env.example .env

Edit .env with your details:

DATABASE_URL="postgresql://postgres:password@localhost:5432/test?schema=public"
JWT_SECRET=your_jwt_secret  # e.g., "mysecretkey"
PORT=3000

Replace password with your postgres user password.

### 6. Set Up the Database Schema
Generate Prisma Client:


yarn prisma generate

Apply migrations to create the User table:


yarn prisma migrate dev --name init

### 7. Start the Application


yarn start:dev

The app runs in watch mode, restarting on file changes.

Expected output:

Starting NestJS application...
NestJS application created successfully
[Nest] 12345 - 03/12/2025, XX:XX:XX LOG [NestFactory] Starting Nest application...
[Nest] 12345 - 03/12/2025, XX:XX:XX LOG [GraphQLModule] Mapped {/graphql} route
NestJS application listening on port 3000

### 8. Access GraphQL Playground
Open your browser and navigate to:

http://localhost:3000/graphql

Use the Playground to test GraphQL queries and mutations.

Usage
GraphQL Endpoints
The schema is auto-generated at src/schema.gql. Key operations:
Register a User
graphql

mutation {
  register(input: { email: "test@example.com", password: "password123" })
}

Returns a JWT token.

Standard Login
graphql

mutation {
  login(input: { email: "test@example.com", password: "password123" })
}

Returns a JWT token.

Biometric Login
First, add a biometricKey to a user in pgAdmin:
Right-click User table > View/Edit Data > Add biometricKey (e.g., bio123).

Query:
graphql

mutation {
  biometricLogin(input: { biometricKey: "bio123" })
}

Returns a JWT token.

Testing
Manual Testing
Use GraphQL Playground at http://localhost:3000/graphql to test endpoints.

Unit Tests
Run unit tests:
cmd

yarn test

Watch mode:
cmd

yarn test:watch

Coverage:
cmd

yarn test:cov

End-to-End Tests
Run E2E tests (if implemented):
cmd

yarn test:e2e

Environment Variables
Required variables in .env:
DATABASE_URL: PostgreSQL connection string (e.g., postgresql://postgres:password@localhost:5432/test?schema=public).

JWT_SECRET: Secret key for JWT signing (e.g., mysecretkey).

PORT: Port for the application (default: 3000).

Dependencies
NestJS: Framework for building server-side applications.

GraphQL: Query language for the API, powered by @nestjs/graphql and @apollo/server.

Prisma: ORM for database management.

JWT: Authentication with @nestjs/jwt and passport-jwt.

bcrypt: Password hashing.

Troubleshooting
App Doesn’t Start:
Check PostgreSQL is running: services.msc > postgresql-x64-14.

Verify DATABASE_URL with psql -U postgres -d test.

Port Conflict:
Change PORT in .env and restart.

Dependency Issues:
Reinstall: rmdir /s /q node_modules && del yarn.lock && yarn install.

Submission
The project is hosted on GitHub: https://github.com/charly-com/nestjs-backend-test
Author
Charles Chijuka

License
This project is unlicensed (UNLICENSED).

```
