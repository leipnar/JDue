# **JDue Todo App**

## **📝 Project Overview**

The JDue Todo App is a full-stack, responsive web application designed to help users manage their projects and tasks efficiently. It provides a clean interface for organizing daily tasks, tracking project progress, and includes an administrative dashboard for user management and system oversight.

This application is deployed on a Virtual Private Server (VPS) and utilizes a modern technology stack to ensure performance and scalability.

## **✨ Features**

* **User Authentication:** Secure user registration and login.  
* **Project Management:** Create, view, edit, and delete personal projects.  
* **Task Management:** Add, update, mark as complete, and delete tasks associated with projects.  
* **Intuitive UI:** A clean, user-friendly interface with toggleable sidebar and clear iconography.  
* **Admin Dashboard:**  
  * User management capabilities (e.g., renaming usernames).  
  * Access to system statistics.  
  * Overview of application data.  
* **Responsive Design:** Optimized for seamless use across various devices (desktop, tablet, mobile).  
* **Secure Deployment:** HTTPS enabled with proper handling of sensitive data.

## **🚀 Live Application**

The JDue Todo App is live and accessible at:  
https://jdue.leipnar.com

## **🛠️ Technologies Used**

### **Backend**

* **Node.js:** JavaScript runtime environment.  
* **Express.js (Implied):** For building RESTful APIs (via worker/index.js routing).  
* **PostgreSQL:** Robust relational database for data storage.  
* **PM2:** Production process manager for Node.js applications.

### **Frontend**

* **React (Implied):** For building the user interface (context/DataContext.tsx, components/).  
* **NPM:** Package manager.  
* **Nginx:** High-performance web server acting as a reverse proxy and static file server.

### **Database**

* **PostgreSQL:**  
  * Database Name: jdue-production-db  
  * Tables: users, projects, tasks (with appropriate indexing for performance).

## **⚙️ Project Structure**

.  
├── public/                 \# Static assets for the frontend  
├── src/                    \# Frontend source code  
│   ├── components/         \# Reusable UI components (e.g., Icon.tsx)  
│   ├── context/            \# React Context for global state (e.g., DataContext.tsx)  
│   ├── pages/              \# Main application pages  
│   └── App.tsx             \# Main React application component  
├── worker/                 \# Backend source code  
│   └── index.js            \# API routing and endpoint definitions  
├── .env.example            \# Example environment variables (DO NOT COMMIT .env)  
├── .gitignore              \# Files/directories ignored by Git  
├── package.json            \# Project dependencies and scripts (Version 1.0.2)  
├── package-lock.json       \# Locked versions of dependencies  
└── README.md               \# This file

## **💻 Setup and Local Development**

To run the project locally, follow these steps:

1. **Clone the repository:**  
   git clone https://github.com/leipnar/JDue.git  
   cd JDue

2. **Install dependencies:**  
   npm install

3. **Database Setup:**  
   * Ensure you have PostgreSQL installed and running locally.  
   * Create a new database (e.g., jdue-development-db).  
   * Create a database user and grant privileges.  
   * Run your schema creation scripts to create users, projects, and tasks tables.  
4. **Environment Variables:**  
   * Create a .env file in the project root. **This file should NOT be committed to Git.**  
   * Add your local database credentials and any other necessary secrets:  
     \# .env  
     DB\_HOST=localhost  
     DB\_PORT=5432  
     DB\_USER=your\_local\_db\_user  
     DB\_PASSWORD=your\_local\_db\_password  
     DB\_NAME=jdue-development-db  
     JWT\_SECRET=a\_secure\_random\_string\_for\_dev  
     PORT=3001 \# Or desired port for backend

5. **Run the Backend:**  
   npm run start:backend \# Or whatever script starts worker/index.js

6. **Run the Frontend:**  
   npm run start:frontend \# Or whatever script starts your React app

   The frontend typically runs on http://localhost:3000 (or similar), and will proxy API requests to your backend.

## **🚀 Deployment to VPS**

Detailed deployment instructions for a Linux VPS using Nginx, PM2, and PostgreSQL are available in the project documentation (or separate instruction files). Key steps include:

1. Provisioning the VPS and installing prerequisites (Node.js, npm, PM2, Nginx, PostgreSQL).  
2. Configuring PostgreSQL database and user on the VPS.  
3. Cloning the repository and installing dependencies on the VPS.  
4. Setting production environment variables for the backend (e.g., via PM2's ecosystem.config.js).  
5. Building the frontend for production.  
6. Configuring Nginx to serve the frontend and reverse proxy API requests to the backend.  
7. Setting up SSL with Certbot for HTTPS access.

## **🔑 Test Credentials**

For testing the deployed application, you can use the following accounts:

### **User Account**

* **Email:** test@example.com  
* **Password:** SecurePassword123\!  
* **Role:** Regular user

### **Admin Account**

* **Email:** admin@example.com  
* **Password:** \[Set manually in database after hashing\]  
* **Role:** Admin (manually set in database post-creation)  
* **Access:** Admin dashboard with user management and system statistics.

## **📚 API Endpoints Reference**

### **Authentication**

* POST /api/auth/login \- User login  
* POST /api/auth/register \- User registration  
* GET /api/users/me \- Get current user profile

### **Projects**

* GET /api/projects \- Get user's projects  
* POST /api/projects \- Create project  
* PUT /api/projects/:id \- Update project  
* DELETE /api/projects/:id \- Delete project

### **Tasks**

* GET /api/tasks \- Get user's tasks  
* POST /api/tasks \- Create task  
* PUT /api/tasks/:id \- Update task  
* DELETE /api/tasks/:id \- Delete task

### **Admin**

* GET /api/admin/users \- Get all users  
* GET /api/admin/stats \- Get system statistics  
* GET /api/admin/data \- Get admin data

## **📄 License**

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
