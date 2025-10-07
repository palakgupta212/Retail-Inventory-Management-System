# Retail Inventory Management System

Full-stack Retail Inventory Management System built with React, Node.js, Express, and MongoDB.
Ready-to-post GitHub scaffold with backend APIs, role-based auth, and a simple React frontend.

## Features
- Admin and Staff roles with JWT authentication
- CRUD operations for Products, Suppliers, and Purchase Orders
- Stock level tracking and low-inventory notifications (simple polling)
- Responsive React UI with Bootstrap
- Ready for deployment to Render and MongoDB Atlas

## Tech Stack
- Frontend: React, Bootstrap
- Backend: Node.js, Express, Mongoose
- Database: MongoDB (Atlas recommended)
- Auth: JWT (role-based)
- Deployment: Render / MongoDB Atlas recommended

## Repo structure
```
/backend    -> Express server, models, routes, middleware
/frontend   -> React app (CRA-style)
README.md
.env.example
```

## Quick start (local)

### Prerequisites
- Node.js v16+ and npm
- MongoDB URI (local or Atlas)

### Backend
```bash
cd backend
cp .env.example .env
# set MONGO_URI and JWT_SECRET in .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Notes
- Configure `MONGO_URI` and `JWT_SECRET` before running.
- For production, use a secure session store and HTTPS, and configure proper CORS and environment variables.
- This scaffold is intentionally simple — extend it with websockets, background jobs, or cloud notifications for real-time inventory in production.
