# LearnPulse — Course Selling Platform

A full-stack course selling platform built with the **MERN stack** (MongoDB, Express, React, Node.js) featuring Razorpay payment integration, Cloudinary media storage, and a modern responsive UI.

---

## Features

### Student
- Browse and search published courses with filters
- View course details with video preview
- Purchase courses via Razorpay payment gateway
- Track course progress with lecture completion
- Manage profile and enrolled courses

### Instructor
- Create and manage courses with rich text descriptions
- Upload lecture videos to Cloudinary
- Set course pricing, category, and difficulty level
- Publish/unpublish courses
- View enrolled students and revenue dashboard

### Platform
- JWT-based authentication with role-based access (Student / Instructor)
- Responsive design with dark/light mode support
- Real-time toast notifications
- Secure environment variable configuration

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, ShadCN UI, Redux Toolkit |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT (JSON Web Tokens) + bcrypt |
| Payments | Razorpay |
| Media Storage | Cloudinary |
| State Management | Redux Toolkit + RTK Query |

---

## Project Structure

```
Course Selling/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── features/api/   # RTK Query API slices
│   │   ├── pages/
│   │   │   ├── student/    # Student-facing pages
│   │   │   ├── admin/      # Instructor dashboard pages
│   │   │   └── Login.jsx   # Auth page with role selector
│   │   ├── layout/         # Layout wrappers
│   │   └── app/            # Redux store config
│   └── .env                # Client environment variables
│
├── server/                 # Express backend
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── middlewares/         # Auth middleware
│   ├── utils/              # Cloudinary & Multer config
│   ├── database/           # MongoDB connection
│   └── .env                # Server environment variables
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- Razorpay account (test mode)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/course-selling.git
cd course-selling
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=8080
SECRET_KEY=your_jwt_secret_key

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

### 3. Setup the Client

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

Start the client:

```bash
npm run dev
```

### 4. Open in browser

Navigate to `http://localhost:5173` (or the port Vite assigns).

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/user/register` | Register a new user |
| POST | `/api/v1/user/login` | Login |
| GET | `/api/v1/user/logout` | Logout |
| GET | `/api/v1/user/profile` | Get user profile |
| PUT | `/api/v1/user/profile/update` | Update profile |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/course` | Create course |
| GET | `/api/v1/course` | Get creator's courses |
| PUT | `/api/v1/course/:courseId` | Edit course |
| GET | `/api/v1/course/:courseId` | Get course by ID |
| PATCH | `/api/v1/course/:courseId` | Publish/unpublish |
| GET | `/api/v1/course/published-courses` | Get all published courses |
| GET | `/api/v1/course/search` | Search courses |

### Lectures
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/course/:courseId/lecture` | Create lecture |
| GET | `/api/v1/course/:courseId/lecture` | Get course lectures |
| POST | `/api/v1/course/:courseId/lecture/:lectureId` | Edit lecture |
| DELETE | `/api/v1/course/lecture/:lectureId` | Delete lecture |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/purchase/checkout/create-order` | Create Razorpay order |
| POST | `/api/v1/purchase/checkout/verify-payment` | Verify payment |
| GET | `/api/v1/purchase/course/:courseId/detail-with-status` | Course detail + purchase status |

### Media
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/media/upload-video` | Upload video to Cloudinary |

---

## Screenshots

### Homepage
> Dark gradient hero section with search, category tags, and stats bar

### Course Detail
> Udemy-inspired layout with video preview, instructor info, and lecture list

### Instructor Dashboard
> Course management with publish controls and lecture editor

### Login / Sign Up
> Role selector for Student or Instructor registration

---

## Environment Variables Reference

### Server `.env`

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Server port (default: 8080) |
| `SECRET_KEY` | JWT signing secret |
| `CLOUD_NAME` | Cloudinary cloud name |
| `API_KEY` | Cloudinary API key |
| `API_SECRET` | Cloudinary API secret |
| `RAZORPAY_KEY_ID` | Razorpay Key ID |
| `RAZORPAY_SECRET` | Razorpay Secret |
| `FRONTEND_URL` | Frontend URL for CORS |

### Client `.env`

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Shubhranshu Behera**

Built with ❤️ using the MERN Stack
