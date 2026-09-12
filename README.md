# ReportMe — Weekly Report Generator & Team Dashboard

ReportMe is a full-stack web application for creating, submitting, reviewing, and managing weekly team reports.

## Features

* Create and submit weekly reports
* Save reports as drafts
* Edit reports requiring correction
* Manager review and approval
* Report version history
* Project and status filtering
* Role-based access for Members and Managers
* JWT authentication with access and refresh tokens using HTTP-only cookies
* Manager-only AI assistant

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
* JWT
* Google Gemini API

**Testing**

* Jest
* Supertest

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

Create `.env` files in both `client` and `server`.

**Client `.env`**

```env
VITE_API_URL=http://localhost:8000
```

**Server `.env`**

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

Backend:

```text
http://localhost:8000
```

### 5. Run Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

The application is now ready to use.
