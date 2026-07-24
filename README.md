# HorizonX

A full-stack real-time chat app I built to learn how messaging systems work end to end — auth, sockets, media uploads, and a clean UI that actually feels usable.

**Live demo:** [horizonx-psii.onrender.com](https://horizonx-psii.onrender.com/)

---

## What it does

- Sign up / log in with JWT stored in httpOnly cookies
- One-to-one messaging in real time (Socket.io)
- See who’s online, with an optional “online only” filter
- Send text and images (images go through Cloudinary)
- Update your profile picture
- Switch between 30+ DaisyUI themes (saved in localStorage)
- Protected routes — you can’t hit the chat without being logged in

---

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS, DaisyUI, Zustand, Axios, React Router |
| Backend | Node.js, Express 5, MongoDB (Mongoose), Socket.io |
| Auth | JWT + bcrypt, cookie-based sessions |
| Media | Cloudinary |
| Deploy | Render (API + built frontend served together in production) |

---

## Project structure

```
Chat-App/
├── backend/
│   └── src/
│       ├── controllers/     # auth + messages
│       ├── middlewares/     # JWT protectRoute
│       ├── models/          # User, Message
│       ├── routes/
│       ├── lib/             # db, socket, cloudinary, jwt helpers
│       └── seeds/           # sample users for local testing
└── frontend/
    ├── src/
    │   ├── components/      # chat UI pieces
    │   ├── pages/           # Home, Login, Signup, Profile, Settings
    │   └── lib/
    ├── store/               # Zustand: auth, chat, theme
    └── constants/           # theme list
```

---

## How it works (short version)

1. User logs in → server sets a JWT cookie and the client opens a Socket.io connection with their `userId`.
2. Online users are broadcast to everyone; the sidebar updates live.
3. Sending a message hits the REST API, gets saved in MongoDB, and is pushed to the receiver’s socket if they’re online.
4. Image messages are uploaded to Cloudinary first; the secure URL is what gets stored and shown in chat.

---

## Getting started

### Prerequisites

- Node.js
- MongoDB (local or Atlas)
- A Cloudinary account (for profile pics / chat images)

### 1. Clone & install

```bash
git clone <your-repo-url>
cd Chat-App

npm install --prefix backend
npm install --prefix frontend
```

### 2. Backend env

Create `backend/.env`:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

### 3. Run locally

Terminal 1 — API:

```bash
cd backend
npm run dev
```

Terminal 2 — frontend:

```bash
cd frontend
npm run dev
```

App runs at `http://localhost:5173`, API at `http://localhost:5001`.

### Optional: seed users

```bash
cd backend
node src/seeds/user.seed.js
```

---

## Production build

From the root:

```bash
npm run build
npm start
```

In production the Express server serves the Vite build from `frontend/dist` and handles both API and client routes.

---

## API overview

**Auth** (`/api/auth`)

| Method | Route | Description |
| --- | --- | --- |
| POST | `/signup` | Create account |
| POST | `/login` | Log in |
| POST | `/logout` | Clear cookie |
| PUT | `/update-profile` | Upload / change avatar (auth) |
| GET | `/check` | Current session (auth) |

**Messages** (`/api/messages`)

| Method | Route | Description |
| --- | --- | --- |
| GET | `/users` | Users for sidebar (auth) |
| GET | `/:id` | Chat history with a user (auth) |
| POST | `/send/:id` | Send text/image message (auth) |

---

## Things I focused on while building this

- Keeping auth secure with httpOnly cookies instead of stuffing tokens in localStorage
- Making real-time feel reliable (online status + message delivery over sockets)
- Clean state on the frontend with Zustand instead of prop drilling everywhere
- A UI that works on both desktop and smaller screens

---

## License

ISC
