# ReportMe — Weekly Report Generator & Team Dashboard

ReportMe is a full-stack web application for creating, submitting, reviewing, and managing weekly team reports.

## Tech Stack

**Frontend**

* React
* Vite
* Tailwind CSS
* React Router

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication (Access & Refresh Tokens)
* Google Gemini API

**Testing**

* Jest
* Supertest

## Deployment

**Live Application:**
https://weekly-report-app-amber.vercel.app

## Demo Login

**Manager Account**

* Email: `manager@gmail.com`
* Password: `Manager2000@`

> Use the provided demo account to access the Manager Dashboard and review the application's manager features.

## Setup Instructions

### 1. Install Dependencies

**Backend**

```bash
cd server
npm install
```

**Frontend**

```bash
cd client
npm install
```

### 2. Configure Environment Variables

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:8000
```

Create a `.env` file inside the `server` directory:

```env
PORT=8000
MONGO_URI=your_mongo_url

JWT_ACCESS_SECRET=your_secret
JWT_ACCESS_EXPIRES=15m

NODE_ENV=development

CLIENT_URL=http://localhost:5173

GEMINI_API_KEY=your_gemini_api_key
```

### 3. Run Database

Make sure MongoDB is running or your MongoDB Atlas database is accessible.

### 4. Run Backend

```bash
cd server
node server.js
```

Backend: `http://localhost:8000`

### 5. Run Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend: `http://localhost:5173`
