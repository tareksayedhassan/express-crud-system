# Express CRUD System with Authentication, Roles, File Uploads, and MVC Structure

## 📌 Project Description

This project is a powerful backend system built with **Node.js** and **Express.js**, following the **MVC (Model-View-Controller)** architecture. It includes:

- ✅ User authentication using **JWT tokens**
- ✅ Role-based authorization (`admin` / `manager` / `user`)
- ✅ Protected routes based on user roles
- ✅ Full **CRUD operations**
- ✅ **File upload** functionality
- ✅ Clean and organized **MVC folder structure**
- ✅ **OOP-style error handling** for consistent API responses

---

## 📂 Project Structure (MVC)

project-root/
│
├── controllers/ # Request handlers (business logic)

├── models/ # Mongoose models / schemas

├── routes/ # All API route definitions

├── middlewares/ # Auth, role check, error handling, etc.

├── uploads/ # Uploaded files

├── utils/ # Helper functions

├── app.js # Main app setup

---

## 🔐 Authentication & Authorization

- Users can **register** and **login**
- Authentication is handled using **JWT**
- Passwords are **hashed** securely using bcrypt
- Role-based access control:
  - `admin`: Full access
  - `manager`: Moderate access
  - `user`: Limited access
- Protected routes using custom **middleware**

---

## 📁 File Upload

- Users can **upload files** via specific API endpoints
- Uploaded files are stored in the `/uploads` directory (or as configured)
- File validation and restrictions can be added via middleware (e.g., file type/size)

---

## 🚧 OOP-Style Error Handling

Custom error classes and centralized error handling middleware are used to return:

- Consistent and readable error messages
- Different HTTP status codes based on the type of error
- Easy to debug and scale

---

## 🔁 CRUD Operations

The API supports full CRUD on multiple resources. Example routes:

- `POST /api/items` – Create item
- `GET /api/items` – Read all items
- `PUT /api/items/:id` – Update item
- `DELETE /api/items/:id` – Delete item

---

## 💾 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT for auth**
- **bcrypt for hashing**
- **Multer for file uploads**
- **dotenv**
- **nodemon**
- **OOP for error handling**

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/tareksayedhassan/express-crud-system.git
cd express-crud-system

2. Install dependencies


npm install
3. Set up environment variables

Create a .env file in the root with the following:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

4. Run the app

npm run start

📫 Contact
Made with ❤️ by Tarek El-Sayed

Check out more projects on my GitHub



