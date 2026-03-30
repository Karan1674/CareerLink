# 🚀 CareerLink – Full Stack Job Portal

<p align="center">
  <b>A scalable, modern job portal built with the MERN stack to streamline job discovery, recruitment, and application management.</b>
</p>

---

## 📌 Overview

CareerLink is a full-stack web application designed to bridge the gap between job seekers and recruiters. It provides a seamless platform for users to explore job opportunities, apply to roles, and manage their professional profiles, while enabling recruiters to efficiently manage job postings and applicants.

The platform is built with a focus on **performance, scalability, and user experience**, incorporating modern UI practices and secure backend architecture.

---

## ✨ Core Features

### 👤 User Functionality
- Secure user authentication with JWT and HTTP-only cookies
- Profile management with resume and profile photo upload
- Browse and search jobs with dynamic filtering
- Apply to jobs and track application status
- Save and manage favorite job listings

### 🏢 Recruiter Functionality
- Company registration and management
- Create, update, and manage job postings
- View applicants for specific job roles
- Update application status (accepted/rejected)

### ⚙️ System Features
- Role-based access control (Student / Recruiter)
- RESTful API architecture
- Cloud-based media storage using Cloudinary
- Persistent global state using Redux Toolkit
- Responsive and modern UI with Tailwind CSS and ShadCN UI
- Optimized search functionality using query-based filtering

---

## 🛠️ Tech Stack

<p align="center">

  <img src="https://img.shields.io/badge/Frontend-React.js-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Framework-Express.js-black?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/State-Redux_Toolkit-purple?style=for-the-badge&logo=redux" />
  <img src="https://img.shields.io/badge/UI-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/UI-ShadCN_UI-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Uploads-Cloudinary-orange?style=for-the-badge&logo=cloudinary" />
  <img src="https://img.shields.io/badge/Auth-JWT-yellow?style=for-the-badge&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/State_Persistence-Redux_Persist-purple?style=for-the-badge" />

</p>

---

## 🧠 Architecture & Design

The application follows a **modular and scalable architecture**:

- **Frontend:** Built using React with component-based architecture and reusable UI elements  
- **State Management:** Centralized state handled via Redux Toolkit with persistence  
- **Backend:** RESTful API built using Express.js with clear separation of routes, controllers, and models  
- **Database:** MongoDB with Mongoose ODM for schema modeling and relationships  
- **Authentication:** Secure JWT-based authentication with cookie handling  
- **File Handling:** Multer for file uploads integrated with Cloudinary for storage  

---

## 🔐 Security Implementation

- Password hashing using bcrypt  
- JWT-based authentication with token expiration  
- HTTP-only cookies to prevent XSS attacks  
- Protected routes using middleware validation  
- Role-based authorization for controlled access  

---

## ⚡ Performance & Optimization

- Efficient API queries with filtering and sorting  
- Lazy loading and optimized rendering in frontend  
- Centralized state to reduce unnecessary API calls  
- Clean and maintainable code structure for scalability  

---

## 📈 Key Functional Highlights

- Dynamic job search with multi-field filtering (title, location, type, salary, etc.)
- Real-time job application tracking system
- Save/unsave job functionality with instant UI updates
- Recruiter dashboard for managing companies and job postings
- Integrated file upload system for resumes and profile images
- Fully responsive UI ensuring compatibility across devices

---

## 🎯 Use Case

CareerLink serves as a complete job management platform suitable for:
- Students and fresh graduates seeking opportunities  
- Recruiters managing hiring workflows  
- Developers showcasing full-stack development capabilities  

---

## 🚀 Future Enhancements

- Real-time notifications for job updates  
- AI-based job recommendations  
- Resume-job matching system  
- Email integration for application updates  
- Advanced analytics dashboard for recruiters  

---

## 👨‍💻 Developers

| Name             | GitHub Profile                                   |
|------------------|--------------------------------------------------|
| Karanjit Singh  | [Karan1674](https://github.com/Karan1674)         |
| Vivek Mahey     | [vivekmahey](https://github.com/vivekmahey)       |

Aspiring Software Developers focused on building modern, responsive, and user-friendly web applications.