# Sowberry Academy

Sowberry Academy is a comprehensive **Learning Management System (LMS)** designed to bridge the gap between students, mentors, and administrators. It provides a robust platform for course management, skill assessment, coding practice, and interactive learning.

## 🚀 Features

### 🎓 For Students

- **Dashboard**: personalized view of enrolled courses, pending assignments, and upcoming events.
- **Course Learning**: Browse courses, enroll, and access structured content (Videos, Text, PDFs).
- **Assessments**: Take **Aptitude Tests** with auto-grading and timer.
- **Coding Practice**: Solve coding problems with an integrated environment.
- **Assignments**: Submit assignments (files or links) and receive graded feedback.
- **Doubts & Support**: Raise doubts on specific topics and get answers from mentors.
- **Progress Tracking**: Visual analytics of course completion and logical grades.

### 👩‍🏫 For Mentors

- **Course Creation**: Design courses with structured subjects, topics, and multimedia content.
- **Assignment Management**: Create assignments, set deadlines, and grade user submissions.
- **Test Creation**: Build aptitude tests with multiple-choice questions.
- **Coding Challenges**: Add new coding problems with test cases.
- **Student Monitoring**: Track student progress and performance.
- **Events**: Schedule and manage webinars or workshops.

### 🛡️ For Administrators

- **User Management**: Manage Students and Mentors (verify, activate/deactivate).
- **System Overview**: High-level dashboard for platform usage statistics.
- **Course Approval**: Review and publish courses created by mentors.
- **Reports**: Generate system-wide performance reports.

---

## 🛠️ Tech Stack

### Frontend

- **React 19**: Modern UI library for building interactive interfaces.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router DOM**: Client-side routing.
- **Remix Icons**: Icon library.
- **SweetAlert2**: Beautiful replacement for JavaScript's popup boxes.

### Backend

- **Node.js & Express**: Robust REST API server.
- **MySQL**: Relational database for structured data storage.
- **JWT**: Secure authentication (JSON Web Tokens).
- **Bcrypt**: Password hashing for security.
- **Multer**: File upload handling.

---

## 📂 Project Structure

```
Sowberry/
├── server/                 # Backend Node.js Application
│   ├── config/             # Database configuration & setup scripts
│   ├── middleware/         # Auth & validation middleware
│   ├── routes/             # API route definitions (auth, student, mentor, admin)
│   ├── uploads/            # Directory for uploaded files
│   └── server.js           # Entry point for the backend
├── src/                    # Frontend React Application
│   ├── components/         # Reusable UI components
│   ├── context/            # specific React Context (Auth)
│   ├── pages/              # Page components (Admin, Mentor, Student, Auth)
│   ├── App.jsx             # Main Router configuration
│   └── main.jsx            # Entry point
└── package.json            # Project dependencies and scripts
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MySQL Server** (Running locally or remotely)
- **Git**

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/jayanthansenthilkumar/Sowberry.git
    cd Sowberry
    ```

2.  **Install Dependencies**
    - **Root (Frontend)**:
      ```bash
      npm install
      ```
    - **Server (Backend)**:
      ```bash
      cd server
      npm install
      cd ..
      ```

3.  **Database Setup**
    - Create a MySQL database (default name: `sowberry`).
    - Configure the database connection in a `.env` file in the `server` directory (see below).
    - Run the setup script to create tables and seed data:
      ```bash
      node server/config/dbSetup.js
      ```

4.  **Environment Variables**
    Create a `.env` file in the `server/` directory:

    ```env
    PORT=5000
    NODE_ENV=development

    # Database Config
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=sowberry

    # JWT Secret
    JWT_SECRET=your_super_secret_key_change_this

    # Client URL (for CORS)
    CLIENT_URL=http://localhost:5173
    ```

### Running the Application

Run both frontend and backend concurrently from the root directory:

```bash
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 📖 Detailed Use Cases & User Flows

### 1. Authentication Flow

- **Registration**: Users sign up with details (Email, Username, Role: Student).
- **OTP Verification**: An email OTP is simulated (logged in console) to verify the account.
- **Login**: Access the platform using Username/Email and Password.
- **Forgot Password**: Secure flow to reset password via OTP.

### 2. Student Use Cases

**a. Course Enrollment & Learning**

1.  Navigate to **"My Courses"** or **"Browse Courses"**.
2.  Click **Enroll** on a desired course.
3.  Open the **Course Viewer** to access subjects and topics.
4.  Watch videos or read content.
5.  Mark topics as **Completed** to track progress.

**b. Assignments**

1.  Go to **"My Assignments"**.
2.  View pending tasks sorted by due date.
3.  Click **Submit**, enter your answer or paste a file link.
4.  View grades and feedback after mentor review.

**c. Skill Assessment**

1.  **Aptitude Tests**: Take timed MCQ tests. Results are instant.
2.  **Coding Practice**: Solve problems in the integrated editor. Submit code and view status.

### 3. Mentor Use Cases

**a. Course Management**

1.  **Create Course**: Define title, category, and syllabus.
2.  **Add Content**: Structure the course into Subjects -> Topics. Upload Videos/PDFs.
3.  **Publish**: Make the course available for students.

**b. Student Evaluation**

1.  **Assignments**: Review submissions and assign grades/feedback.
2.  **Doubts**: View doubts raised by students in your courses and provide answers.

### 4. Admin Use Cases

**a. System Oversight**

1.  **Dashboard**: View total users, active courses, and system health.
2.  **User Management**: View user lists, verify registered students manually if needed.
3.  **Reports**: Check system-wide analytics on course completion rates.

---

## 📡 API Documentation Overview

The backend exposes RESTful endpoints at `http://localhost:5000/api`.

| Module      | Base Path      | Key Endpoints                                       |
| :---------- | :------------- | :-------------------------------------------------- |
| **Auth**    | `/api/auth`    | `/login`, `/register`, `/verify-otp`, `/me`         |
| **Student** | `/api/student` | `/dashboard`, `/courses`, `/enroll`, `/assignments` |
| **Mentor**  | `/api/mentor`  | `/courses` (CRUD), `/assignments` (CRUD), `/doubts` |
| **Admin**   | `/api/admin`   | `/users`, `/reports`, `/settings`                   |
| **Public**  | `/api/public`  | `/courses` (Public view), `/contact`                |

---

<!-- ## 🧪 Default Test Credentials

The `dbSetup.js` script seeds the following users for testing:

| Role        | Email                   | Password      |
| :---------- | :---------------------- | :------------ |
| **Admin**   | `admin@sowberry.com`    | `Admin@123`   |
| **Mentor**  | `mentor1@sowberry.com`  | `Mentor@123`  |
| **Student** | `student1@sowberry.com` | `Student@123` |

--- -->

## 📄 License

This project is proprietary software of Sowberry Academy.