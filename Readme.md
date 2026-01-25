# ⚙️ Backend Project  

**A foundational backend project demonstrating core server-side development concepts, user authentication, video management, and subscriptions.**  

</div>

---

## 📖 Overview

This repository implements a **scalable Node.js backend** for a video-sharing platform. It demonstrates:

- RESTful API design  
- JWT-based authentication  
- Video uploads with Cloudinary  
- User channel management and subscriptions  
- Watch history tracking  

It’s ideal for developers learning backend development, practicing REST APIs, or building a full-stack project.

---

## ✨ Features

- 🎯 **RESTful API**: Structured endpoints for users, videos, and subscriptions  
- 🔐 **Authentication & Authorization**: JWT-based login, logout, token refresh  
- 🗄️ **Database**: MongoDB with Mongoose models  
- 📹 **Video Uploads**: Cloudinary + Multer integration  
- 🧹 **Code Quality**: Prettier for formatting consistency  
- ⚡ **Middleware**: Request validation, error handling, and auth guards  

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Server-side JavaScript runtime |
| **Express.js** | Web framework for REST APIs |
| **MongoDB & Mongoose** | NoSQL database with ODM |
| **bcrypt** | Password hashing |
| **jsonwebtoken (JWT)** | Authentication and access tokens |
| **dotenv** | Environment variable management |
| **Cloudinary** | Media uploads and storage |
| **Multer** | File upload handling |
| **Prettier** | Code formatting |

---

## 🚀 Quick Start

### Prerequisites

- Node.js `v18.x`+  
- npm `v9.x`+  
- MongoDB (local or cloud)  

### Installation

```bash
git clone https://github.com/Karangosavi29/Backend-project.git
cd Backend-project
npm install
cp .env.example .env


updated ENV

PORT=8000
MONGODB_URI="mongodb://localhost:27017/backend-project"
ACCESS_TOKEN_SECRET="YOUR_ACCESS_TOKEN_SECRET"
REFRESH_TOKEN_SECRET="YOUR_REFRESH_TOKEN_SECRET"
CORS_ORIGIN="*" # frontend URL if needed
CLOUDINARY_CLOUD_NAME="YOUR_CLOUDINARY_CLOUD_NAME"
CLOUDINARY_API_KEY="YOUR_CLOUDINARY_API_KEY"
CLOUDINARY_API_SECRET="YOUR_CLOUDINARY_API_SECRET"

npm run dev

Project Structure
.
├── public/                # Static files
├── src/
│   ├── controllers/       # Request handling logic
│   ├── routes/            # API route definitions
│   ├── models/            # Database schemas
│   ├── middlewares/       # Auth, error handling
│   ├── utils/             # Helpers
│   ├── app.js             # Express app setup
│   └── index.js           # Entry point
├── .gitignore
├── .prettierrc
├── package.json
└── README.md


| Variable                | Description               | Required |
| ----------------------- | ------------------------- | -------- |
| `PORT`                  | Server port               | ✅        |
| `MONGODB_URI`           | MongoDB connection string | ✅        |
| `ACCESS_TOKEN_SECRET`   | JWT access token secret   | ✅        |
| `REFRESH_TOKEN_SECRET`  | JWT refresh token secret  | ✅        |
| `CORS_ORIGIN`           | Allowed CORS origin       | ✅        |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name     | ⚪        |
| `CLOUDINARY_API_KEY`    | Cloudinary API key        | ⚪        |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret     | ⚪        |

Development
| Command       | Description                               |
| ------------- | ----------------------------------------- |
| `npm run dev` | Start development server with auto-reload |
| `npm start`   | Start production server                   |

📚 API Reference (Partial)
Authentication

POST /api/auth/register – Register a new user

POST /api/auth/login – Login and get access & refresh tokens

POST /api/auth/logout – Logout and clear refresh token

POST /api/auth/refresh – Refresh access token

Users

GET /api/users/:id/profile – Get user channel details

GET /api/users/:id/watch-history – Get watched videos

Subscriptions

POST /api/subscriptions/:channelId – Subscribe

DELETE /api/subscriptions/:channelId – Unsubscribe

(Full API docs TBD after route/controller review)


