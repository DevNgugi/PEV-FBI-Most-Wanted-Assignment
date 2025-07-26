# FBI Most Wanted – Fullstack Express/vue.js Application

A fullstack web application to search, display, and manage information about FBI Most Wanted fugitives.  
Built with **Vue.js** on the frontend, **Express.js** on the backend, and **Redis** for caching FBI API responses.

## Project Structure

```
project-root/
├── frontend/        # Vue.js app (UI for listing/searching fugitives)
│   └── .env
├── backend/         # Express API (calls FBI API + caches via Redis)
│   └── .env
├── docker-compose.yml
└── README.md
```

## 1. How to Run the Frontend Application

### Development (without Docker)

```bash
cd frontend
npm install
npm run dev
```

The app runs by default at: [http://localhost:5173](http://localhost:5173)

#### Frontend Environment Variables (`frontend/.env`)
```env
VITE_API_URL=http://localhost:3000/api
```

This tells the Vue app where to send API requests.

##  2. How to Run the Backend Application

###  Development (without Docker)

```bash
cd backend
COPY .env.sample to .env
npm install
node index.js

npm run test
```

The backend runs by default at: [http://localhost:3000](http://localhost:3000)

#### Backend Environment Variables (`backend/.env`)
```env
PORT=3000
FBI_API_BASE_URL=https://api.fbi.gov
WANTED_ENDPOINT=wanted/v1/list
PERSON_ENDPOINT=@wanted-person
REDIS_HOST=redis
REDIS_PORT=6379
CACHE_TTL=3600
API_RETRIES=3
API_TIMEOUT=10000
```

> This backend fetches data from the FBI API and caches responses using Redis.

##  3. Configuration & Environment

Each service has its own `.env` file:

| Service   | File             | Key Environment Variables                   |
|-----------|------------------|----------------------------------------------|
| Frontend  | `frontend/.env`  | `VITE_API_URL` (e.g., `/api`, or full URL)  |
| Backend   | `backend/.env`   | `PORT`, `REDIS_HOST`, `FBI_API_BASE_URL`    |

## 4. Dependencies & Setup

### Backend
- Node.js
- Express
- Axios (for FBI API calls)
- Redis

```bash
cd backend
npm install
```

### Frontend
- Vue 3 + Vite

```bash
cd frontend
npm install
```

## 6.3 Testing

### Backend
```bash
cd backend
npm test
```

###  Frontend
```bash
cd frontend
npm run test:unit
```

## .4 Deployment Guide (Dockerized Setup)

### Using Docker Compose

```bash
docker-compose up --build
```

- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend: [http://localhost:3000](http://localhost:3000)
- Redis: Internal Docker service (`redis:6379`)

###  Shutdown

```bash
docker-compose down
```

## Key Features

- Browse and search FBI’s most wanted fugitives
- Backend caches API responses with Redis to improve speed
- Fully containerized using Docker for easy deployment