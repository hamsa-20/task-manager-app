#  Mini SaaS Task Management System

A production-ready full-stack Task Management application built as part of a Full Stack Developer Intern screening test. This app allows users to securely manage their personal tasks with authentication and multi-user support.

---

##  Live Demo

*  Frontend: https://task-manager-app-eight-mu.vercel.app/
*  Backend API: https://task-manager-app-dl5r.onrender.com


---

##  Features

###  Authentication

* User Signup & Login
* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes

###  Task Management (Multi-User)

* Create tasks
* View only personal tasks
* Update task status (Pending → Completed)
* Delete tasks
* Set due dates (with calendar)
* Prevent past date selection

###  UI/UX

* Built with React + Tailwind CSS
* Clean dark-themed UI
* Responsive layout
* Status badges and dropdown updates

---

##  Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* JWT (jsonwebtoken)
* bcrypt

### Database

* PostgreSQL
* Sequelize ORM

---

##  Database Schema

### Users Table

* id (Primary Key)
* name
* email (Unique)
* password (Hashed)
* createdAt, updatedAt

### Tasks Table

* id (Primary Key)
* title
* status (ENUM: pending, completed)
* dueDate (Date)
* UserId (Foreign Key → Users.id)
* createdAt, updatedAt

### Relationships

* One user → many tasks
* Each task belongs to one user

---

##  Project Structure

```
task-manager-saas/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── api.js
│   │   └── App.js
│
└── README.md
```

---

##  Setup Instructions

###  Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5432
DB_NAME=taskmanager
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=secret123
```

Start server:

```bash
npm run dev
```

---

###  Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

##  API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Tasks (Protected)

* GET `/api/tasks`
* POST `/api/tasks`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`

---

##  Security Features

* Password hashing (bcrypt)
* JWT authentication
* Protected routes with middleware
* User-specific data isolation

---

##  Deployment

### Frontend

* Deploy on Vercel

### Backend

* Deploy on Render / Railway

### Database

* Use hosted PostgreSQL (Render / Neon / Supabase)

---

##  Future Improvements

* Task filtering (All / Completed / Pending)
* Edit task title
* Priority levels
* Notifications/reminders
* Drag & drop tasks

---

##  Conclusion

This project demonstrates a complete full-stack SaaS-style application with authentication, database design, API integration, and a clean user interface, following real-world development practices.
