# 📘 Bora Assignment API

A simple REST API built with Node.js, Express, PostgreSQL, and JWT Authentication, supporting user registration, login, and task management with role-based access.

---

## 🚀 Features

- User registration with hashed passwords  
- JWT-based authentication  
- Login with email or username  
- Role-based authorization (basic and admin)  
- Basic users can create, view, and update only their own tasks  
- Admins can view and update all tasks  
- Swagger API documentation  
- Postman collection for testing

---

## ⚙️ Setup Instructions

### ✔ 1. Clone the project
```bash
git clone git@github.com:BoraMiletic/assignment_app.git
cd bora_assignment_app
```

### ✔ 2. Install dependencies
```bash
npm install
```

### ✔ 3. Set up environment variables

Copy `.env.example` and rename it to `.env`, then update with your values.

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=bora_assignment_app
DB_PASSWORD=1234
DB_PORT=5432

JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=1d

PORT=5000
```

---

### ✔ 4. Create PostgreSQL database

Use the following SQL script:

```sql
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
```

---

### ✔ 5. Run the project
```bash
npm start
```

API will be available at:  
👉 `http://localhost:5000`

---

## 📄 API Documentation (Swagger)

Once the application is running, open in browser:

👉 `http://localhost:5000/api-docs`

💡 To access protected routes, login first, copy the token, click **Authorize** in Swagger, and enter:

```
Bearer <your_token>
```

---

## 📬 Postman Collection

You can also test all endpoints using Postman.  
Import the file:

```
REST API.postman_collection.json
```

It contains predefined requests for registration, login, and task operations.

For protected routes, go to **Authorization** tab and select:  
**Type:** Bearer Token  
**Token:** `<your_token>`

---

## 📡 API Routes Overview

| Method | Endpoint           | Description              | Auth Required |
|--------|--------------------|--------------------------|---------------|
| POST   | /api/auth/register | Register new user        | ❌ No          |
| POST   | /api/auth/login    | Login and get token      | ❌ No          |
| POST   | /api/tasks         | Create new task          | ✔ Yes         |
| GET    | /api/tasks         | Get tasks (role-based)   | ✔ Yes         |
| PUT    | /api/tasks/{id}    | Update task by ID        | ✔ Yes         |

---

### 🔑 Getting the JWT Token

Request example for `/api/auth/login`:

```json
{
  "usernameOrEmail": "mike",
  "password": "test123"
}
```

Copy the `"token"` value and use it in Swagger/Postman.

---

## ✍️ Task Functionality Rules

### 🔹 Basic users
✔ Can create tasks  
✔ Can view only their tasks  
✔ Can update only their tasks  

### 🔹 Admins
❌ Cannot create tasks  
✔ Can view all tasks  
✔ Can update any task  

---

## 📌 Future Enhancements (Optional)

- JWT refresh tokens  
- Delete task endpoint  
- Jest/Mocha tests  
- Docker support  
- Deployment to cloud  

---

👤 **Author**  
**Bora Miletic**  
Junior Software Engineer  
