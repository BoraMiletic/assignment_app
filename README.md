📘 Bora Assignment API

A simple REST API built with Node.js, Express, PostgreSQL, and JWT Authentication, supporting user registration, login, and task management with role-based access.

🚀 Features

User registration with hashed passwords

JWT-based authentication

Login with email or username

Role-based authorization (basic and admin)

Basic users can create, view, and update only their own tasks

Admins can view and update all tasks

Swagger API documentation

⚙️ Setup Instructions
✔ 1. Clone the project
git clone <your-repo-url>
cd bora_assignment_app

✔ 2. Install dependencies
npm install

✔ 3. Set up environment variables

Copy .env.example and rename it to .env

Open .env and replace placeholders (<value>) with your local database credentials and JWT settings.

Example:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=bora_assignment_app
DB_PASSWORD=1234
DB_PORT=5432

JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=1d

PORT=5000

✔ 4. Create PostgreSQL database

Run the following SQL script in pgAdmin, DBeaver, or psql terminal:

CREATE DATABASE bora_assignment_app;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'basic',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

✔ 5. Run the project
npm start


The API will be available at:
👉 http://localhost:5000

📄 API Documentation (Swagger)

Once the application is running, open your browser and navigate to:

👉 http://localhost:5000/api-docs

There you can test all endpoints directly, including authentication.

💡 To access protected routes (tasks), first login, get a JWT token, and click Authorize in Swagger.
Enter it like this:

Bearer <your_token>

📡 API Routes Overview
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register new user	❌ No
POST	/api/auth/login	Login and get JWT token	❌ No
POST	/api/tasks	Create new task (basic)	✔ Yes
GET	/api/tasks	Get tasks (role-based)	✔ Yes
PUT	/api/tasks/{id}	Update task by ID	✔ Yes
🔑 Getting the JWT Token

Use /api/auth/login with:

{
  "usernameOrEmail": "mike",
  "password": "test123"
}


In the response, copy the "token" value.

Use it when calling /api/tasks routes:

Authorization: Bearer <token>

✍️ Task Functionality Rules

🔹 Basic users
✔ Can create tasks
✔ Can view only their tasks
✔ Can update only their tasks

🔹 Admins
❌ Cannot create tasks
✔ Can view all tasks
✔ Can update any task

📌 Future Enhancements (Optional)

JWT refresh tokens

Delete task endpoint

Jest/Mocha tests

Docker support

Deployment to cloud (Render, Railway, etc.)

👤 Author

Bora Miletic
Junior Software Engineer