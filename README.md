JDue Todo App📝 Project OverviewThe JDue Todo App is a full-stack, responsive web application designed to help users manage their projects and tasks efficiently. It provides a clean interface for organizing daily tasks, tracking project progress, and includes an administrative dashboard for user management and system oversight.This application is deployed on a Virtual Private Server (VPS) and utilizes a modern technology stack to ensure performance and scalability.✨ FeaturesUser Authentication: Secure user registration and login.Project Management: Create, view, edit, and delete personal projects.Task Management: Add, update, mark as complete, and delete tasks associated with projects.Intuitive UI: A clean, user-friendly interface with toggleable sidebar and clear iconography.Admin Dashboard:User management capabilities (e.g., renaming usernames).Access to system statistics.Overview of application data.Responsive Design: Optimized for seamless use across various devices (desktop, tablet, mobile).Secure Deployment: HTTPS enabled with proper handling of sensitive data.🚀 Live ApplicationThe JDue Todo App is live and accessible at:https://jdue.leipnar.com🛠️ Technologies UsedBackendNode.js: JavaScript runtime environment.Express.js (Implied): For building RESTful APIs (via worker/index.js routing).PostgreSQL: Robust relational database for data storage.PM2: Production process manager for Node.js applications.FrontendReact (Implied): For building the user interface (context/DataContext.tsx, components/).NPM: Package manager.Nginx: High-performance web server acting as a reverse proxy and static file server.DatabasePostgreSQL:Database Name: jdue-production-dbTables: users, projects, tasks (with appropriate indexing for performance).⚙️ Project Structure.
├── public/                 # Static assets for the frontend
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components (e.g., Icon.tsx)
│   ├── context/            # React Context for global state (e.g., DataContext.tsx)
│   ├── pages/              # Main application pages
│   └── App.tsx             # Main React application component
├── worker/                 # Backend source code
│   └── index.js            # API routing and endpoint definitions
├── .env.example            # Example environment variables (DO NOT COMMIT .env)
├── .gitignore              # Files/directories ignored by Git
├── package.json            # Project dependencies and scripts (Version 1.0.2)
├── package-lock.json       # Locked versions of dependencies
└── README.md               # This file
💻 Setup and Local DevelopmentTo run the project locally, follow these steps:Clone the repository:git clone https://github.com/leipnar/JDue.git
cd JDue
Install dependencies:npm install
Database Setup:Ensure you have PostgreSQL installed and running locally.Create a new database (e.g., jdue-development-db).Create a database user and grant privileges.Run your schema creation scripts to create users, projects, and tasks tables.Environment Variables:Create a .env file in the project root. This file should NOT be committed to Git.Add your local database credentials and any other necessary secrets:# .env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_local_db_user
DB_PASSWORD=your_local_db_password
DB_NAME=jdue-development-db
JWT_SECRET=a_secure_random_string_for_dev
PORT=3001 # Or desired port for backend
Run the Backend:npm run start:backend # Or whatever script starts worker/index.js
Run the Frontend:npm run start:frontend # Or whatever script starts your React app
The frontend typically runs on http://localhost:3000 (or similar), and will proxy API requests to your backend.🚀 Deployment to VPSDetailed deployment instructions for a Linux VPS using Nginx, PM2, and PostgreSQL are available in the project documentation (or separate instruction files). Key steps include:Provisioning the VPS and installing prerequisites (Node.js, npm, PM2, Nginx, PostgreSQL).Configuring PostgreSQL database and user on the VPS.Cloning the repository and installing dependencies on the VPS.Setting production environment variables for the backend (e.g., via PM2's ecosystem.config.js).Building the frontend for production.Configuring Nginx to serve the frontend and reverse proxy API requests to the backend.Setting up SSL with Certbot for HTTPS access.🔑 Test CredentialsFor testing the deployed application, you can use the following accounts:User AccountEmail: test@leipnar.comPassword: SecurePassword123!Role: Regular userAdmin AccountEmail: admin@leipnar.comPassword: [Set manually in database after hashing]Role: Admin (manually set in database post-creation)Access: Admin dashboard with user management and system statistics.📚 API Endpoints ReferenceAuthenticationPOST /api/auth/login - User loginPOST /api/auth/register - User registrationGET /api/users/me - Get current user profileProjectsGET /api/projects - Get user's projectsPOST /api/projects - Create projectPUT /api/projects/:id - Update projectDELETE /api/projects/:id - Delete projectTasksGET /api/tasks - Get user's tasksPOST /api/tasks - Create taskPUT /api/tasks/:id - Update taskDELETE /api/tasks/:id - Delete taskAdminGET /api/admin/users - Get all usersGET /api/admin/stats - Get system statisticsGET /api/admin/data - Get admin data📄 LicenseThis project is open-source and available under the MIT License.
